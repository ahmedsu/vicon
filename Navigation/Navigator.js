import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
 import App from '../App';
 import PrviScreen from '../screens/PrviScreen';
import DefaultCurrencyScreen from '../screens/DefautCurrencyScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import LoginScreen from '../screens/LoginScreen';
import EmulgatoriScreen from '../screens/EmulgatoriScreen';
import ShoppingList from '../screens/ShoppingList';
import ListaEmulgatoraScreen from '../screens/ListaEmulgatoraScreen';
 import { createStackNavigator  } from 'react-navigation-stack';
 import {Image, Text, View} from 'react-native';
 import React from 'react';

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
    EmulgatoriScreen,
    ShoppingList
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
    //lazy: false,
    defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName == "App") {
                return (
                    <View style={{flex:1}}>
                        <Image source={require('../src/images/money.png')} style={{width: 35, height: 35}} resizeMode={'cover'}></Image>
                    </View>
                )
                
              } else if (routeName == "EmulgatoriScreen") {
                return (<View style={{flex:1}}>
                    <Image source={require('../src/images/food.png')} style={{width: 35, height: 35}} resizeMode={'cover'}></Image>
                    </View>)
              } else if (routeName == "ShoppingList") {
                return (<View style={{flex:1}}>
                    <Image source={require('../src/images/cart.png')} style={{width: 35, height: 35}} resizeMode={'cover'}></Image>
                    </View>)
              }
            },
            tabBarLabel: () => {
              const { routeName } = navigation.state;
              console.log("ROUTENAME: ", routeName);
              if (routeName == "App") {
                return <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}></Text>
              } else if (routeName == "EmulgatoriScreen") {
                return <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}></Text>
              } else if (routeName == "ShoppingList") {
                return <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}></Text>
              }
      
            },
            tabBarOnPress: ({ navigation, defaultHandler }) => {
              const isTab = navigation.getParam('onTabFocus');
               if(isTab != undefined){
                 navigation.state.params.onTabFocus();
               }
              defaultHandler();
            }
          }),
          tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            style: {
              backgroundColor: "#061e3e",
              height: 60,
              paddingVertical: 8,
              alignItems: 'center'
            }
          }
    
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
    },

  ));

//export default createAppContainer(Stack);