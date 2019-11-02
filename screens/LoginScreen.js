import React,{Component} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity,StyleSheet,Image} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import UserAPI from './services/UserAPI';

class LoginScreen extends Component{
    static navigationOptions = {
        headerMode:'none'
      };

    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    logIn=()=>{
        const {email,password}=this.state;
        UserAPI.Login(email,password)
        .then((res)=>{
            console.log(res);
        })
        //api poziv za provjeru
        //ako je ok spremi jwtToken i idi na main screen
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
            <TextInput placeholder='Email' onChangeText={(text)=>{this.setState({email:text})}} style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%'}} placeholderTextColor='white'></TextInput>
            <TextInput placeholder='Password' secureTextEntry onChangeText={(text)=>{this.setState({password:text})}} style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%'}} placeholderTextColor='white'></TextInput>
           
            <TouchableOpacity
            style={[style.btn,{backgroundColor:'#29AAE3',marginTop:50}]}
            onPress={()=>{this.logIn}}
            >
                <Text style={style.btnText}>Log in</Text>
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
export default LoginScreen;