import auth from '@react-native-firebase/auth';
import React, {memo, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {Navigation} from '../types';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import LoginScreen from './LoginScreen';
import Logo from '../components/Logo';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);

  const __emailValidation = text => {
    let regex = /\S+@\S+\.\S+/;
    if (!text || text.length <= 0 || text === undefined) {
      setErrorEmail('Email required *');
      setValidEmail(true);
    } else if (!regex.test(email)) {
      setErrorEmail('Enter valid email *');
      setValidEmail(true);
    } else {
      setValidEmail(false);
      setErrorEmail('');
    }
  };
  const __passwordValidation = text => {
    if (!text || text.length <= 0 || text === undefined) {
      setErrorPassword('Password required *');
      setValidPassword(true);
      return;
    } else if (text.length < 6) {
      setErrorPassword('Weak Password, Minimum 6 characters are required*');
      setValidPassword(true);
      return;
    } else {
      setValidPassword(false);
      setErrorPassword('');
    }
  };

  const __doCreateUser = async (email, password) => {
    const SuccessMessage = 'Account created successfully';
    try {
      if (email.trim().length == 0) {
        setErrorEmail('Email required *');
      } else if (password.trim().length == 0) {
        setErrorPassword('Password required *');
      } else {
        let response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        if (response && response.user) {
          setFetching(true);
          // console.log('response', response, 'response---->', response.user);
          navigation.navigate('LoginScreen');
          Toast.showWithGravity(SuccessMessage, Toast.SHORT, Toast.BOTTOM);
        }
      }
    } catch (e) {
      const errMessage =
        'The email address is already in use by another account.';
      Toast.showWithGravity(errMessage, Toast.SHORT, Toast.BOTTOM);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/arrow_back.png')}
        />
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.header}>{'Create Account'}</Text>
        <View style={{alignItems: 'center'}}>
          <Logo />
        </View>
        <View>
          {!!fetching && <ActivityIndicator color={theme.colors.primary} />}
        </View>

        <View style={{marginTop: 40}}>
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email}
            onChangeText={text => {
              __emailValidation(text);
              setErrorEmail;
              setEmail(text);
            }}
            error={isValidEmail}
            errorText={errorEmail}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            selectionColor={theme.colors.primary}
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password}
            autoCapitalize={false}
            style={{fontSize: 14}}
            selectionColor={theme.colors.primary}
            onChangeText={text => {
              __passwordValidation(text);
              setPassword(text);
            }}
            error={isValidPassword}
            secureTextEntry
            errorText={errorPassword}
          />
        </View>
        <Button
          style={{marginBottom: 20}}
          mode="contained"
          onPress={() => {
            __doCreateUser(email, password);
          }}>
          SIGN UP
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default memo(RegisterScreen);

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center',
  },
  logoImage: {
    width: 128,
    height: 128,
    marginBottom: 12,
    alignSelf: 'center',
  },
  container: {
    marginTop: 20,
    position: 'absolute',
  },
});
