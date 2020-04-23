import { createDrawerNavigator, DrawerItems,createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import EmailInputscreen from '../screens/EmailInputScreen';
import PasswordInputscreen from '../screens/PasswordInputScreen';
import TestScreen from '../screens/TestScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPassword from '../screens/ForgotPassword'
const StackNavigator = createStackNavigator({
  IntroScreen:{screen: IntroScreen, headerShown: false },
  LoginScreen: {screen: LoginScreen, headerShown: false },
  ForgotPassword: {screen: ForgotPassword, headerShown: false },
  EmailInputscreen: EmailInputscreen,
  PasswordInputscreen: PasswordInputscreen,
  TestScreen: TestScreen,
  HomeScreen:   HomeScreen 
},
{
  initialRouteName: 'LoginScreen',
}

);
export default createAppContainer(StackNavigator);