import React,{Component} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity,StyleSheet,Image} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons'
class DefaultCurrencyScreen extends Component{
    render()
    {
        return(
            <View style={styles.container}> 
            <View style={{height:'55%',width:'100%'}}>
                <Image
                style={{height:'100%',width:'100%'}}
                source={require('./assets/pare.png')}
                ></Image>
            </View>
            <Text style={{color:'white',fontSize:16}}>Set your default currency</Text>
            <TextInput placeholder='Izaberite svoju defaultnu valutu' style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%'}} placeholderTextColor='white'></TextInput>
            <View style={{height:50,width:'75%',justifyContent:'flex-end',alignItems:'flex-end',marginTop:30}}>
            <TouchableOpacity
            style={{flexDirection:'row',alignItems:'center'}}
            >
                <Text style={{color:'#29AAE3',marginRight:8}}>Next</Text>
               <Icon name='ios-arrow-forward' size={40} color="#29AAE3"/>
            </TouchableOpacity>
            </View>

            </View>
        );
    }
}
const style=StyleSheet.create({
    btn:{
        width:'70%',
        height:50,
        borderWidth:2,
        borderColor:'#29AAE3',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginTop:20
    },
    btnText:{
        color:'white',
        fontSize:14   
    }
})
export default DefaultCurrencyScreen;