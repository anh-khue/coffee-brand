import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import Logo from '../components/Logo';

export default class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (

            <KeyboardAvoidingView
                behavior="padding"
            >
                <Logo />
                <View style={styles.container}>

                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Username"
                        onChangeText={(e) => this.handleOnChange(e, 'email')}
                        placeholderTextColor="#ffffff" />
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        onChangeText={(e) => this.handleOnChange(e, 'password')}
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true} />
                    <TouchableOpacity style={styles.button}>
                        <Text onPress={() => this.props.handleLogin(this.state.email, this.state.password)} style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
    handleOnChange(e, field) {
        this.setState({
            [field]: e
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#8b6b61',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    buttonText: {
        fontSize: 16,

        fontWeight: 'bold',
        color: '#321911',
        textAlign: 'center'
    },
    button: {
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        // onPress:{() => navigate('')}  
    }
});
