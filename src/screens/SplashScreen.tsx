import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 1000);
  }, []);
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextStyle}>FIREBASE AUTHENTICATION</Text>
      <Image style={styles.ImageStyle} source={require('../assets/key.png')} />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  ImageStyle: {
    height: 200,
    width: 200,
    marginTop: 20,
  },
});
