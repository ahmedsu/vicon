import React, { PureComponent } from 'react';
import {StyleSheet, Text, TouchableOpacity, View,ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
import EmulgatorAPI from '../screens/services/EmulgatorAPI';
import Icon from 'react-native-vector-icons/Feather';

class ListaEmulgatoraScreen extends PureComponent {
  constructor(props)
  {
    super(props);
  }
  componentDidMount()
  {
      let lista=this.props.navigation.getParam("listaEmulgatora");
      console.log("lista emulgatora");
      console.log(lista);
  }
  render() {
    return (
      <View>
      </View>
    );
  }
}
  
export default ListaEmulgatoraScreen;