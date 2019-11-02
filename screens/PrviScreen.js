import React,{Component} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity,StyleSheet,Image} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

class PrviScreen extends Component{
    componentDidMount()
    {
        this.pogledajToken();
    }
    pogledajToken=async ()=>{
        let jwt=await AsyncStorage.getItem("jwtToken");
        if(jwt && jwt.length>0)
        {
            console.log("gleda token");
            this.props.navigation.navigate("App");
            //posalji usera u app
        }
    }
    render()
    {
        return(
            <View style={styles.container}> 
            <View style={{height:'55%',width:'100%'}}>
                <Image
                style={{height:'100%',width:'100%'}}
                source={require('./assets/FirstScreen.png')}
                ></Image>
            </View>
            <Text style= {{color:'white',fontSize:20}}>Welcome to ViCon</Text>
            <Text style={{color:'white',fontSize:16}}>Save money & stay healthy</Text>
            <TouchableOpacity
            style={[style.btn,{backgroundColor:'#29AAE3'}]}
            onPress={()=>{console.log("poziva se"); this.props.navigation.navigate("LoginScreen")}}
            >
                <Text style={style.btnText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={style.btn}
            onPress={()=>{this.props.navigation.navigate("PersonalInfoScreen")}}
            >
                <Text style={style.btnText} >Register</Text>
            </TouchableOpacity>
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
export default PrviScreen;