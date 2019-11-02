import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
 import App from '../App';
 import PrviScreen from '../screens/PrviScreen';
import DefaultCurrencyScreen from '../screens/DefautCurrencyScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import LoginScreen from '../screens/LoginScreen';
import EmulgatoriScreen from '../screens/EmulgatoriScreen';
 import { createStackNavigator } from 'react-navigation-stack';
 
const Stack= createStackNavigator({
    App,
    EmulgatoriScreen,
 PrviScreen,
 DefaultCurrencyScreen,
 PersonalInfoScreen,
 LoginScreen
});

const Navigator= createBottomTabNavigator({
    PrviScreen:{
        screen:PrviScreen,
        headerMode:'none',
        navigationOptions:{
           headerVisible:false
        }
    },    
    App
});

export default createAppContainer(Stack);