import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';
import Home from './Home';


export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.handleLogin.bind(this)

        this.state = {
            authenticated: false
        }
    }
    render() {
        if (!this.state.authenticated) {
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Logo />
                        <Form handleLogin={() => this.handleLogin()} />
                    </View>
                </View>
            )
        } else {
            return (
                <Home />
            )
        }
    }

    handleLogin() {
        this.setState({
            authenticated: true
        })
    }

}


const styles = StyleSheet.create({
    container: {
        //   flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});