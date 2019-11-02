import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
 import App from '../App';
 import PrviScreen from '../screens/PrviScreen';
import DefaultCurrencyScreen from '../screens/DefautCurrencyScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import LoginScreen from '../screens/LoginScreen';
import EmulgatoriScreen from '../screens/EmulgatoriScreen';
 import { createStackNavigator  } from 'react-navigation-stack';
 import ListaEmulgatoraScreen from '../screens/ListaEmulgatoraScreen';
const Stack= createStackNavigator({
 PrviScreen,
 DefaultCurrencyScreen,
 PersonalInfoScreen,
 LoginScreen,
 ListaEmulgatoraScreen
 //App,
 //EmulgatoriScreen
},
{
    headerMode: 'none',
    initialRouteName: 'PrviScreen',
    navigationOptions: {
        headerVisible: false,
    }
});

const Navigator= createBottomTabNavigator({
    App,
    EmulgatoriScreen
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
    //lazy: true,
    
});

export default createAppContainer(createSwitchNavigator(
    {
      ////AuthLoading: AuthLoadingScreen,
      //Auth: Auth,
      Navigator: Navigator,
      Stack: Stack
     // Main: MainNavigator
    },
    {
      initialRouteName: 'Stack',
    }
  ));

//export default createAppContainer(Stack);