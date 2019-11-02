import React,{Component} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity,StyleSheet,Image} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

class ShoppingList extends Component{
   
    render()
    {
        return(
            <View style={style.container}> 
                <View style={{width:'100%', alignItems:'center', paddingVertical: 30}}><Text style={{color:'#fff', fontSize: 16}}>Monday, 2.11.2019</Text></View>
                <View style={{flexDirection:'column', alignItems:'center', width:'100%'}}>
                    <View style={style.itemBox}>
                        <Text style={style.itemText}>
                            Item 1
                        </Text>
                        <Text style={style.itemText}>
                            2.13 USD
                        </Text>
                        <Text style={style.itemText}>
                            3.73 BAM
                        </Text>
                    </View>
                    <View style={style.itemBox}>
                        <Text style={style.itemText}>
                            Item 1
                        </Text>
                        <Text style={style.itemText}>
                            2.13 USD
                        </Text>
                        <Text style={style.itemText}>
                            3.73 BAM
                        </Text>
                    </View>
                    <View style={style.itemBox}>
                        <Text style={style.itemText}>
                            Item 1
                        </Text>
                        <Text style={style.itemText}>
                            2.13 USD
                        </Text>
                        <Text style={style.itemText}>
                            3.73 BAM
                        </Text>
                    </View>
                </View>
                <View style={{justifyContent:'center', marginTop: 50}}>
                <View style={{width:'100%', justifyContent:'center'}}><Text style={style.subText}>+ add manually</Text></View>
                <View style={{width:'100%', justifyContent:'center'}}><Text style={style.subTextMain}>Total in USD:</Text></View>
                <View style={{width:'100%', justifyContent:'flex-end'}}><Text style={style.subTextPrice}>6.39</Text></View>
                <View style={{width:'100%', justifyContent:'center'}}><Text style={style.subTextMain}>Total in BAM:</Text></View>

                <View style={{width:'100%', justifyContent:'flex-end'}}><Text style={style.subTextPrice}>11.19</Text></View>
                
                </View>

                <View style={{flexDirection:'row', paddingVertical: 10, justifyContent:'space-between', position:'absolute', bottom: 20, width:'100%', paddingHorizontal: 25}}>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}><Text style={{color:'#d63031', fontWeight:'bold'}}>CLEAR ALL</Text></TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}><Text style={{color:'#00b894', fontWeight:'bold'}}>CONFIRM</Text></TouchableOpacity>

                </View>
            </View>
        );
    }
}
const style=StyleSheet.create({
    subTextPrice:{
        fontSize: 18,
        color: '#FFF',
        fontWeight:'bold',
        textAlign: 'right',
        marginTop: 10,
        marginBottom:10
    },
    subTextMain:{
        color:'#FFF',
        fontSize: 17,
        marginTop: 5,
        marginBottom:5
    },
    subText:{
        color:'gray',
        fontSize: 15,
        paddingVertical: 10
    },
    itemBox:{
        marginBottom: 25,
        flexDirection:'row', 
        borderBottomColor: '#29abe2', 
        height: 'auto',
        borderBottomWidth: 1,
    },
    itemText:{
        color:'#fff',
        fontSize: 17
    },
    container:{
        flex:1,
        backgroundColor:"#061F3E",
        alignItems:'center',

    },
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
export default ShoppingList;