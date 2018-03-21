import React from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';


export default class Logo extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Image style={{width: 200, height: 200}}
                    source={require('../images/logo.png')}/>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent:'flex-end',
      alignItems:'center'
    },
    logoText: {
        marginVertical:15,
        fontSize:18,
        color:'#000000'
      },
  });
