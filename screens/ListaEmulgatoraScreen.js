import React, { PureComponent } from 'react';
import {StyleSheet, Text, TouchableOpacity, View,ImageBackground,ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
import EmulgatorAPI from '../screens/services/EmulgatorAPI';
import Icon from 'react-native-vector-icons/Feather';

class ListaEmulgatoraScreen extends PureComponent {
  constructor(props)
  {
    super(props);
    this.state={
        emulgatori:null
    }
  }
  componentDidMount()
  {
      this.setState({emulgatori:this.props.navigation.getParam("listaEmulgatora")});
  }
  mapirajEmulgatore=()=>{
    return this.state.emulgatori.map((el)=>{
        return <ScrollView contentContainerStyle={{width:'90%',backgroundColor:'#29AAE3',height:250,marginTop:15,marginBottom:15,borderRadius:10,padding:5}} key={el.id}>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'white'}}>
            <Text style={{color:'white',fontSize:16}}>Name: {el.name}</Text>
            <Text style={{color:'white',fontSize:16}}>Code: E{el.code}</Text>
            </View>
            <View style={{width:'100%'}}>
                <Text style={{color:'white',fontSize:16,borderBottomWidth:1,borderBottomColor:'white'}}>Notice</Text>
                <Text style={{color:'white',fontSize:16}}>{el.notice}</Text>
            </View>
            <View style={{width:'100%'}}>
                <Text style={{color:'white',fontSize:16,borderBottomWidth:1,borderBottomColor:'white'}}>Info</Text>
                <Text style={{color:'white',fontSize:16}}>{el.info}</Text>
            </View>
        </ScrollView>;
    })
  }
  render() {
    return (
        <ScrollView contentContainerStyle={{width:'100%',alignItems:'center',backgroundColor:'#061F3E'}}> 
        {this.state.emulgatori && this.state.emulgatori.length>0 &&
        this.mapirajEmulgatore()}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    btn:{
      width:'70%',
      height:50,
      borderWidth:2,
      borderColor:'#29AAE3',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5
  },
  btnText:{
      color:'white',
      fontSize:14   
  }
  });
  
export default ListaEmulgatoraScreen;