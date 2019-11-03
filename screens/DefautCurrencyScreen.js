import React,{Component} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity,StyleSheet,Image} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons'
import CountryPicker from 'react-native-country-picker-modal'
import UserAPI from './services/UserAPI';
import AsyncStorage from '@react-native-community/async-storage';

class DefaultCurrencyScreen extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            currency: ''
        }
    }

    componentDidMount(){
        let name = this.props.navigation.getParam('name', null);
        let password = this.props.navigation.getParam('password', null);
        let email = this.props.navigation.getParam('email', null);
        this.setState({name, password, email});
    }

    registrujSe=()=>{
        const {name,email,password, currency}=this.state;
        console.log("hoce registrovat");
        console.log(name);
        console.log(email);
        console.log(password);
       // this.props.navigation.navigate('DefaultCurrencyScreen');
 
         UserAPI.Register(name,email,password, currency)
         .then(res=>{
             console.log("dobio sam response");
             console.log(res.jwt);
             AsyncStorage.setItem("jwtToken",res.jwt)
             .then(()=>{
                 console.log("USLO OVJE");
                 this.props.navigation.navigate('Navigator');
             })
 
         })
     }
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
            <TextInput editable={false} placeholder='Izaberite svoju defaultnu valutu' style={{borderBottomColor:'#29AAE3',color:'white',borderBottomWidth:2,width:'70%', marginBottom: 15}} value={this.state.currency} placeholderTextColor='white'></TextInput>
           
            <CountryPicker withCurrency={true}  onSelect={(country) => {
                console.log("ZEMLJA: ");
                console.log(country);
                this.setState({currency: country.currency[0]});
            }}></CountryPicker>
            <View style={{height:50,width:'75%',justifyContent:'flex-end',alignItems:'flex-end',marginTop:30}}>
            <TouchableOpacity
            onPress={() => this.registrujSe()}
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