import React, { PureComponent } from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
import EmulgatorAPI from './screens/services/EmulgatorAPI';

class App extends PureComponent {
  constructor(props)
  {
    super(props);
    this.state={
      emulgatori:[],
      nizPodataka:null
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> USLIKAJ </Text>
          </TouchableOpacity>
        </View>

        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 1, base64: true,skipProcessing:true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      let detektovano=await RNTextDetector.detectFromUri(data.uri);
      console.log("DETEKTOVANO");
      console.log(detektovano);
      let fullString='';
      detektovano.forEach(element => {
        console.log("USLO U FOREACH");
        fullString+=element.text;
        console.log(element.text);
      });
      let nizRijeci=[];
      nizRijeci=fullString.split(" ");
      let kopijaNizaRijeci=[].concat(nizRijeci);
      console.log(nizRijeci);
      let odvojeniNiz=[];
      for(let i=0;i<nizRijeci.length;i++)
      {
        if(nizRijeci[i]=='E')
        {
          console.log("NIZ [i]" + nizRijeci[i]+ " NIZ [i+1]"+nizRijeci[i+1]);
          if(nizRijeci[i+1].includes(","))
          {
            let str=nizRijeci[i+1];
            let izdvojeniBr=str.substr(0,str.indexOf(','));
            let el=nizRijeci[i]+" "+izdvojeniBr;
            odvojeniNiz.push(el);
          }
          else{
            odvojeniNiz.push(nizRijeci[i]+' '+nizRijeci[i+1]);
          }
        }
      }
      console.log("OVO SU CLANOVI emulgatora: "+odvojeniNiz);
      this.setState({emulgatori:[...odvojeniNiz]},async ()=>{
        console.log(this.state.emulgatori);
        let data=[];
        for(let em of this.state.emulgatori)
        {

          let emulgatorCode=em.substr(2,em.length-1);
          console.log("EMULGATOR CODE");
          let pravaVr='';
          for(let j=0;j<emulgatorCode.length;j++)
          {
            //dodatna provjera jer nekad ne prepozna dobro pa pošalje čudan karakter
            if((emulgatorCode.charCodeAt(j)>47 && emulgatorCode.charCodeAt(j)<58) || (emulgatorCode.charCodeAt(j)>96 && emulgatorCode.charCodeAt(j)<123))
            {
              pravaVr+=emulgatorCode[j];
              break;
            }
          }
          console.log(emulgatorCode);
          console.log("prava vr");
          console.log(pravaVr);
          let obj=await EmulgatorAPI.GetEmulgatorByCode(pravaVr);
          console.log("OBJ");
          console.log(obj);
          data.push(obj.data);
          
        }
        this.setState({nizPodataka:[].concat(data)},async ()=>{
          console.log("OVO JE NIZ PODATAKA ");
          console.log(this.state.nizPodataka);
        });
        
      });
      
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
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
});

export default App;