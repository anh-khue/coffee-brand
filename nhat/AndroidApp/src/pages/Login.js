import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';
import Home from './Home';


export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.handleLogin.bind(this)

        this.state = {
            authenticated: false,
            user: {

            }
        }
    }
    render() {
        if (!this.state.authenticated) {
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Logo />
                        <Form handleLogin={(email, password) => this.handleLogin(email, password)} />
                    </View>
                </View>
            )
        } else {
            return (
                <Home user={this.state.user} />
            )
        }


    }

    handleLogin(email, password) {
        console.log(email)
        console.log(password)
        fetch('http://192.168.1.6:8001/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
        }).then(json => {
            console.log(json)
            this.setState({
                authenticated: true,
                user: json
            })
        })

    }

}


const styles = StyleSheet.create({
    container: {
        //   flex: 1,
        backgroundColor: '#5d4037',
        alignItems: 'center',
        justifyContent: 'center'
    }
});