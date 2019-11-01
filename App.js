import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {RNCamera} from 'react-native-camera'


class App extends Component {
  takePicture = async() => {
    console.log(this.camera);
    try{
      let res=await this.camera.takePictureAsync();
      console.log(res);
    }
    catch(err)
    {
      console.log(err);
    }

    /*if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }*/
  };
  render()
  {
    return (
      <View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
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
        <Text>ViCon</Text>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Text style={{ fontSize: 14 }}> Slikaj </Text>
          </TouchableOpacity>
        </View>
      </View>
   );
  }
};



export default App;
