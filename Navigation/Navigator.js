import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
 import App from '../App';
 import LoginScreen from '../screens/LoginScreen';

const Navigator= createBottomTabNavigator({
  LoginScreen,
  App
});

export default createAppContainer(Navigator);