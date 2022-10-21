import auth from '@react-native-firebase/auth';
import React, {memo, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {Navigation} from '../types';
import {emailValidator, passwordValidator} from '../core/utils';
import Toast from 'react-native-simple-toast';

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({navigation}: Props) => {
  const userList = useSelector(state => state);
  console.log('userlisttt111-->', userList);
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const _onLoginPressed = async (email, password) => {
    console.log('email--', email, 'password--', password);
    if (email) {
      const emailError = emailValidator(email);
      const passwordError = passwordValidator(password);

      if (emailError || passwordError) {
        setEmail({...email, error: emailError});
        setPassword({...password, error: passwordError}); //////.........................................
        return;
      }
    }

    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      const SuccessMessage = 'Account created successfully';
      if (response && response.user) {
        console.log('response', response, 'response---->', response.user);
        // Alert.alert('Success ✅', 'Welcome to Dashboard screen');
        Toast.showWithGravity(SuccessMessage, Toast.SHORT, Toast.BOTTOM);
        navigation.navigate('Dashboard');
      }
    } catch (e) {
      // console.error(e.message);
      const errMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      Toast.showWithGravity(errMessage, Toast.SHORT, Toast.BOTTOM);
      // alert(
      //   'There is no user record corresponding to this identifier. The user may have been deleted.',
      // );
    }
  };

  return (
    <Background>
      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => {
          setEmail({value: text, error: ''});
          console.log(text, '00000000000000000000000000'); //////////////////////..................................
        }}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={() => {
          // let errEmail = 'Please enter valid email';
          // let errPassword = 'Please enter valid password';
          console.log('emaillen--', email);
          if (
            email.value !== undefined &&
            email.value.length > 3 &&
            password.value.length > 3
          ) {
            _onLoginPressed(email.value.trim(), password.value.trim()); ////////////////------------------------------
          } else {
            _onLoginPressed('a', 'b');
          }
        }}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
