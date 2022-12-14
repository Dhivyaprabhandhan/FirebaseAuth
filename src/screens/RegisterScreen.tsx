import auth from '@react-native-firebase/auth';
import React, {memo, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import Button from '../components/Button';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {Navigation} from '../types';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [isValidName, setValidName] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);

  const emailValidation = text => {
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
  const passwordValidation = text => {
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
  const nameValidator = name => {
    var regName = /^[A-Za-z]+$/
    if (!name || name.length <= 0 || name === undefined) {
      setErrorName('Please enter your name *');
      setValidName(true);
      return;
    }
    else if(!regName.test(name)){
      setErrorName('Please enter valid name *');
      setValidName(true);
      return; 
    }
    else if (name.length > 20) {
      setErrorName('Name is too long *');
      setValidName(true);
      return;
    }
    else {
      setValidName(false);
      setErrorName('');
    }
  }
  const doCreateUser = async (email, password) => {
    const SuccessMessage = 'Account created successfully';
    try {
      console.log("try block executed")
      if (email.trim().length == 0) {
        setErrorEmail('Email required *');
      } else if (password.trim().length == 0) {
        setErrorPassword('Password required *');
      } else {
        console.log("else part executed")
        let response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log("response---",response)
        if (response && response.user) {
          console.log("11111111")
          setFetching(true);
          // console.log('response', response, 'response---->', response.user);
          navigation.navigate('LoginScreen');
          Toast.showWithGravity(SuccessMessage, Toast.SHORT, Toast.BOTTOM);
        }
      }
    } catch (e) {
      console.log("222222")
      const errMessage =
        'The email address is already in use by another account.';
      Toast.showWithGravity(errMessage, Toast.SHORT, Toast.BOTTOM);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <TouchableOpacity
        onPress={() => {
          console.log('presss');
          navigation.navigate('LoginScreen')}}
        style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/arrow_back.png')}
        />
      </TouchableOpacity>
      {/* <Background> */}
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
            label="Name"
            returnKeyType="next"
            value={name}
            onChangeText={text => {
              nameValidator(text);
              setErrorName;
              setName(text);
            }}
            error={isValidName}
            errorText={errorName}
            autoCapitalize='words'
            textContentType="name"
            keyboardType="default"
            selectionColor={theme.colors.primary}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email}
            onChangeText={text => {
              emailValidation(text);
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
              passwordValidation(text);
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
            doCreateUser(email, password);
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
    // backgroundColor:"red"
  },
  safeAreaViewStyle:{
    flex: 1, 
    marginHorizontal: 20, 
    marginTop: Platform.OS == 'ios'? 30 : 0
  }
});
