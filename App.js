import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert
} from 'react-native';

import { RNCamera as Camera } from "react-native-camera";
import RNTextDetector from "react-native-text-detector";
import ImageEditor from "@react-native-community/image-editor";
import style, { screenHeight, screenWidth } from './src/styles/style';
import BarcodeMask from 'react-native-barcode-mask';
import ImagePicker from 'react-native-image-crop-picker';

const PICTURE_OPTIONS = {
  quality: 0.8,
  fixOrientation: true,
  forceUpOrientation: true
};

class App extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: [],
    inProcess: false,
    croppedImg: '',
    currency: '',
    regularImg: null,
    pokaz: null
  }

  /**
   * reset
   *
   * Handles error situation at any stage of the process
   *
   * @param {string} [error="OTHER"]
   * @memberof App
   */
  reset(error = "OTHER") {
    this.setState(
      {
        loading: false,
        inProcess: false,
        image: null,
        error
      },
      () => {
        console.log("DESIO SE ERROR!");
        // setTimeout(() => this.camera.startPreview(), 500);
      }
    );
  }

  resetFinal() {
      this.setState({loading:false, inProcess: false, image: null,visionResp:[], regularImg: null});
  }


  /* MAIN FUNKCIJA */
  takeImage = async() => {
    if (this.camera) {
      this.setState({inProcess: true});
      const options = { quality: 1, base64: true,skipProcessing:true, orientation:'portrait' };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({regularImg: data.uri});
      let xOffset = (data.width/4.3);
      let yOffset = (data.height/4.3);
      //let xOffset = (screenWidth-280)/2;
      //let yOffset = (screenHeight-220)/2;
      console.log("XOFFSET: ", xOffset);
      console.log("YOFFSET: ", yOffset);
 
      console.log("WIDTH: ", data.width);
      console.log("HEIGHT: ", data.height);
 
      console.log("WIDTH SCREEN: ", screenWidth);
      console.log("HEIGHT SCREEN: ", screenHeight);
 
      const cropData = {
       offset: {
           x: xOffset+50,
           y: yOffset+20,
       },
       size: { // OSE SU OBRNUTE Width JE Height; Ovdje se radi stimanje za visinu i sirinu slike
           width: (data.width/1.9), 
           height: (data.height/1.9) - 20,
          
       },
       resizeMode: 'cover'
     };
     this.setState({pokaz: {
       width: data.width/2,
       height: data.height/2,
       x: xOffset,
       y: yOffset
     }});
     let croppedImageUri = await ImageEditor.cropImage(data.uri, cropData);
     console.log("Cropped image uri");
     console.log(croppedImageUri);
     this.setState({croppedImg: croppedImageUri}, () => {
       console.log("Postavljena crop slika!");
     });
 
     let _visionResp = await RNTextDetector.detectFromUri(croppedImageUri);
     console.log("DETEKTOVANO");
     console.log(_visionResp);
     
     this.setState({image: croppedImageUri}, () => {
       if(_visionResp.length > 0){
          this.processImage(croppedImageUri, {
            height: cropData.size.height,
            width: cropData.size.width
          }, _visionResp);
       } else {
        Alert.alert(
          "Error",
          "There is no detected text in the image."
        )
       }
     })
 
 
    /*  let fullString='';
      detektovano.forEach(element => {
        console.log("USLO U FOREACH");
        console.log(element.text);
      });*/
     // this.setState({taken:true});
    }
  };

  /**
   * processImage
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {string} uri              Path for the image to be processed
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   * @author Zain Sajjad
   */
  processImage = /*async*/ (uri, imageProperties, _visionResp) => {
    console.log("PROCESS IMAGE POZVAN!!!");
    //const visionResp = await RNTextDetector.detectFromUri(uri);
   // console.log(visionResp);
    /*if (!(visionResp && visionResp.length > 0)) {
      throw "UNMATCHED";
    }*/
     if (!(_visionResp && _visionResp.length > 0)) {
      throw "UNMATCHED";
    }
    this.setState({
      visionResp: this.mapVisionRespToScreen(_visionResp, imageProperties)
    });
  };

  /**
   * mapVisionRespToScreen
   *
   * Converts RNTextDetectors response in representable form for
   * device's screen in accordance with the dimensions of image
   * used to processing.
   *
   * @param {array}  visionResp       Response from RNTextDetector
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   */
  mapVisionRespToScreen = (visionResp, imageProperties) => {
    console.log("MAP VISION RESP POZVAN");
    const IMAGE_TO_SCREEN_X = 280 / imageProperties.height;
    const IMAGE_TO_SCREEN_Y = 220 / imageProperties.width;

    return visionResp.map(item => {
        
      let _width = (item.bounding.width * IMAGE_TO_SCREEN_X);
      let _left = item.bounding.left * IMAGE_TO_SCREEN_X;
      let _height = (item.bounding.height * IMAGE_TO_SCREEN_Y);
      let _top = (item.bounding.top * IMAGE_TO_SCREEN_Y);

      console.log("KALKULACIJE: ");
      console.log("WIDTH: ", _width);
      console.log("HEIGHT: ", _height);
      console.log("LEFT: ", _left);
      console.log("TOP: ", _top);
      return {
        ...item,
        position: {
          width: _width,
          left: _left,
          height: _height,
          top: _top
        }
      };
    });
  };


    /**
   * React Native render function
   *
   * @returns ReactNode or null
   * @memberof App
   */

  render()
  {
    return (
      <View style={style.screen}>
      {!this.state.image ? (
        <View style={[{flex:1}, this.state.inProcess ? {flex: 1, justifyContent:'center'}: {}]}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          type={Camera.Constants.Type.back}
          key="camera"
          ratio="4:3"
          style={style.camera}
          notAuthorizedView={null}
          zoom={0}
          //playSoundOnCapture
        >
          {/*({ camera, status }) => {
            if (status !== "READY") {
              return null;
            }
            return (
              <View style={style.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.takeImage()}
                  style={style.button}
                />
              </View>
            );
          }*/}
          <BarcodeMask edgeColor={'#62B1F6'} width={280} height={220}></BarcodeMask>
        </Camera>
        {this.state.inProcess &&
          <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{width: 250, borderRadius: 5, height: 90, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
              <Text style={{fontSize: 16}}>Processing...</Text>
            </View>
          </View>
          }
         <View style={style.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.takeImage()}
            style={style.button}
          />
          </View>
       </View>
      ) : null}
      {/*this.state.image ? (
        <ImageBackground
          source={{ uri: this.state.image }}
          style={[style.imageBackground]}
          key="image"
          resizeMode="contain"
        >
          {this.state.visionResp.map(item => {
            return (
              <TouchableOpacity
                style={[style.boundingRect, item.position]}
                key={item.text}
              />
            );
          })}

          <View style={{position:'absolute', bottom: 20, justifyContent:'center', alignItems:'center', width:'100%'}}>
            <TouchableOpacity style={{
                    padding: 15, 
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#061e3e'
            }} onPress={() =>this.resetFinal()}>
              <Text style={{color:'#fff', fontSize: 17, fontWeight:'bold'}}>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
          ) : null*/}

      {this.state.image && this.state.regularImg &&
      <View style={{flex:1}}>
      <ImageBackground  blurRadius={3} source={{uri: this.state.regularImg}} imageStyle={{opacity: 0.5}} style={{ flex:1, justifyContent:'center', alignItems:'center'}}>

        <View style={{width:'100%', justifyContent:'center', alignItems:'center', position:'absolute', top: 30}}>
          <View style={{width: '65%', height: 65, flexDirection:'row', borderRadius:10, alignItems:'center', paddingHorizontal: 10, justifyContent:'space-between', backgroundColor:'#061e3e', zIndex: 9999}}>
            <Text style={{color:'#FFF', fontWeight:'bold', fontSize: 26}}>{this.state.currency != '' ? this.state.currency : '1.73'}</Text>
            <Text style={{color:'#FFF', fontWeight:'bold', fontSize: 26}}>BAM</Text>

          </View>
        </View>
        <ImageBackground source={{uri: this.state.image}} style={{width: 280, height: 220}}>
          {this.state.visionResp.map(item => {
              let onlyNumber = item.text.match(/[-]{0,1}[\d]*[\.,]{0,1}[\d]+/);
              console.log("ONLY NUMBER: ", onlyNumber);
              if(onlyNumber != null){
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item);
                      //let str = item.text;
                      //let numbers = str.match(/[-]{0,1}[\d]*[\.,]{0,1}[\d]+/);
                      //console.log(numbers);
                      this.setState({currency: onlyNumber});
                    }}
                    style={[style.boundingRect, item.position]}
                    key={item.text}
                  />
                );
              }
            })}
        </ImageBackground>
        {this.state.pokaz != null &&
        <View style={{zIndex:9999,backgroundColor:'transparent',borderWidth:1, borderColor:'green', width: this.state.pokaz.width, height: this.state.pokaz.height, position:'absolute', left: this.state.pokaz.x, top: this.state.pokaz.y}}>
          <Text>OVDJE</Text>
        </View>
        }
        <View style={{position:'absolute', bottom: 20, justifyContent:'center', alignItems:'center', width:'100%'}}>
        <View style={{width:'75%', flexDirection:'row', justifyContent:'space-between', marginBottom: 15}}>
            <View style={{width: '58%', height: 65, flexDirection:'row', borderRadius:10, alignItems:'center', paddingHorizontal: 10, justifyContent:'space-between', backgroundColor:'#0984e3', zIndex: 9999}}>
              <Image source={require('./src/images/cartWhite.png')} style={{width: 45, height: 35}} resizeMode={'contain'}></Image>
              <Text style={{color:'#FFF', fontWeight:'bold', fontSize: 18}}>Add to list</Text>
            </View>
            <TouchableOpacity onPress={() =>this.resetFinal()} style={{width: '35%', height: 65, flexDirection:'row', borderRadius:10, alignItems:'center', paddingHorizontal: 10, justifyContent:'center', backgroundColor:'#061e3e', zIndex: 9999}}>

              <Text style={{color:'#d63031', fontWeight:'bold', fontSize: 28}}>X</Text>
            </TouchableOpacity>
          </View>
           {/*} <TouchableOpacity style={{
                    padding: 15, 
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'transparent'
            }} onPress={() =>this.resetFinal()}>
              <Text style={{color:'#00b894', fontSize: 17, fontWeight:'bold'}}>NEXT</Text>
          </TouchableOpacity>*/}
          </View>
      </ImageBackground>
      </View>
      }
    </View>
   );
  }
};



export default App;
