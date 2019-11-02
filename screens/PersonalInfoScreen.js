import React,{Component} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity,StyleSheet,Image,ScrollView} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAPI from './services/UserAPI';
import AsyncStorage from '@react-native-community/async-storage';

class PersonalInfoScreen extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            email:'',
            password:''
        }
    }
    registrujSe=()=>{
       const {name,email,password}=this.state;
       console.log("hoce registrovat");
       console.log(name);
       console.log(email);
       console.log(password);
        UserAPI.Register(name,email,password)
        .then(res=>{
            console.log("dobio sam response");
            console.log(res.jwt);
            AsyncStorage.setItem("jwtToken",res.jwt)
            .then(()=>{
                this.props.navigation.navigate('DefaultCurrencyScreen');
            })
        })
    }
    render()
    {
        return(
            <View style={styles.container}> 
            <View style={{height:'55%',width:'100%',alignItems:'center'}}>
                <Image
                style={{height:'90%',width:'86%'}}
                source={require('./assets/musko.png')}
                ></Image>
            </View>
            <Text style={{color:'white',fontSize:20}}>Personal info</Text>
            <TextInput placeholder='Name' autoCapitalize = 'none' onChangeText={(text)=>{this.setState({name:text})}} style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%'}} placeholderTextColor='white'></TextInput>
            <TextInput placeholder='Email' autoCapitalize = 'none' onChangeText={(text)=>{this.setState({email:text})}} style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%'}} placeholderTextColor='white'></TextInput>
           
            <TextInput placeholder='Password' autoCapitalize = 'none' secureTextEntry onChangeText={(text)=>{this.setState({password:text})}} style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%'}} placeholderTextColor='white'></TextInput>
            <View style={{height:50,width:'75%',justifyContent:'flex-end',alignItems:'flex-end',marginTop:30}}>
            <TouchableOpacity
            onPress={this.registrujSe}
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
export default PersonalInfoScreen;