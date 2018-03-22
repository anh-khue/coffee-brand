import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';
import Home from './Home';

const ROLE_CUSTOMER = 'CUSTOMER';

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
                    <Form handleLogin={(email, password) => this.handleLogin(email, password)} />
                </View>
            )
        } else {
            return (
                <Home user={this.state.user} handleLogout={() => this.handleLogout()} />
            )
        }


    }

    handleLogout() {
        this.setState({
            authenticated: false
        })
    }

    handleLogin(email, password) {
        console.log(email)
        console.log(password)
        fetch('http://192.168.100.39:9999/cobra-auth-service/signin', {
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
            } else {
                alert('Wrong email or password!')
            }
        }).then(json => {
            console.log(json)
            if (json.role.name == ROLE_CUSTOMER) {
                this.setState({
                    authenticated: true,
                    user: json
                })
            } else {
                alert('You must be a customer to sign in.')
            }
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