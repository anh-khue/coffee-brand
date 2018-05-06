import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert, Label, Form, Item, Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';
import { Image, StyleSheet, StatusBar } from 'react-native';

import Login from '../pages/Login';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            nav: false,
            info: false,
            user: this.props.user,
            goToLogin: false
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });

        console.log(this.state.user.email)
        fetch('http://192.168.43.19:9999/cobra-customer-service/customer/email=' + this.state.user.email)
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json)
                this.setState({
                    user: {
                        email: this.state.user.email,
                        firstname: json.firstname,
                        lastname: json.lastname,
                        point: json.point,
                        level: json.level.name
                    }
                })
            });
    }



    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        if (!this.state.goToLogin) {
            return (
                <Content scrollEnabled={false}>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Left><Icon name='logo-github' /></Left>
                                    <Right><Text>{this.state.user.email}</Text></Right>
                                    {/* <Right><Text>{this.state.user.role.name}</Text></Right> */}
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Container>
                                <Form>
                                    <Item fixedLabel>
                                        <Label>Email</Label>
                                        <Input value={this.state.user.email} editable={false}/>
                                    </Item>
                                    <Item fixedLabel>
                                        <Label>Firstname</Label>
                                        <Input value={this.state.user.firstname} editable={false}/>
                                    </Item>
                                    <Item fixedLabel>
                                        <Label>Last name</Label>
                                        <Input value={this.state.user.lastname} editable={false}/>
                                    </Item>
                                </Form>
                                <CardItem>
                                    <Left>
                                        <Icon style={{ color: 'orange' }} name="paw" />
                                        <Text style={{ color: 'orange', fontSize: 16 }}>{this.state.user.point} point(s)</Text>
                                    </Left>
                                    <Right>
                                        <Text>Level: {this.state.user.level}</Text>
                                        {/* <Input value={this.state.user.level} /> */}
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button bordered danger onPress={() => this.props.handleLogout()}>
                                            <Text>Sign out</Text>
                                        </Button>
                                    </Left>
                                </CardItem>
                            </Container>
                        </CardItem>
                    </Card>
                </Content>

            );
        } else {
            return (null)
        }
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