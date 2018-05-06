import React from 'react';
import {StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity} from 'react-native';

export default class Form extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Username"
                    placeholderTextColor="#ffffff"/>
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    placeholderTextColor="#ffffff"/>
                <TouchableOpacity style={styles.button}>
                    <Text onPress={() => this.props.handleLogin()} style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent:'center',
      alignItems:'center'
    },
    inputBox:{
        width:300,
        backgroundColor:'#99abb4',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical:5,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10  
    },
    buttonText: {
       fontSize:16,
       fontWeight:'500',
       color:'#ffffff',
       textAlign:'center' 
    },
    button: {
        width:300,
        backgroundColor:'#4680ff',
        borderRadius: 25, 
        marginVertical: 10,
        paddingVertical: 12,
        // onPress:{() => navigate('')}  
    }
  });
