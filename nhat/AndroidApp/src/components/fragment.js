import React, { Component } from 'react';
import { Alert, Label, Form, Item, Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';
import { Image, StyleSheet, StatusBar } from 'react-native';

import User from './User.js'
import UserInfo from './UserInfo.js'

export default class Fragment extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, nav: true, info: false };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
    }
    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return (
            <Container style={{ backgroundColor: '#896a60' }}>
                <Header style={{ backgroundColor: '#8b6b61' }}>
                    <Text style={styles.header} >COBRA</Text>
                </Header>
                {this.state.nav ? <UserInfo /> : <User user={this.props.user}/>}
                <Footer style={{ backgroundColor: '#896a60' }}>
                    <FooterTab style={{ backgroundColor: '#301810' }}>
                        <Button vertical onPress={() => {
                            this.setState({
                                nav: true,
                                info: false
                            })
                        }}>
                            <Icon style={this.state.nav ? styles.buttonPress : styles.button} name="navigate" />
                            <Text style={this.state.nav ? styles.buttonPress : styles.button}>Navigate</Text>
                        </Button>
                        <Button vertical onPress={() => {
                            this.setState({
                                nav: false,
                                info: true
                            })
                        }}>
                            <Icon style={this.state.info ? styles.buttonPress : styles.button} active name="person" />
                            <Text style={this.state.info ? styles.buttonPress : styles.button}>Information</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: StatusBar.currentHeight
    },
    button: {
        color: '#8d8d8d'
    },
    buttonPress: {
        color: '#ffffff'
    }
});