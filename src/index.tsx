import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {LoginScreen, RegisterScreen, Dashboard} from './screens';
import PostDetailScreen from './screens/PostDetailScreen';
import SplashScreen from './screens/SplashScreen';
const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    Dashboard,
    PostDetailScreen,
    SplashScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(Router);
