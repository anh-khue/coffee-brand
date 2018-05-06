import React, { Component } from 'react';
import { Alert, Label, Form, Item, Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';
import { Image, StyleSheet, StatusBar } from 'react-native';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true, 
            nav: false, 
            info: false,
            user: this.props.user
        };
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
            <Content scrollEnabled={false}>
                <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Left><Icon name="logo-github" /></Left>
                                <Right><Text>{this.state.user.email}</Text></Right>
                                <Right><Text>{this.state.user.role.name}</Text></Right>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Container>
                            <Form>
                                <Item fixedLabel>
                                    <Label>Username</Label>
                                    <Input value={this.state.user.email} />
                                </Item>
                                <Item fixedLabel>
                                    <Label>Firstname</Label>
                                    <Input />
                                </Item>
                                <Item fixedLabel>
                                    <Label>Lastname</Label>
                                    <Input />
                                </Item>
                                <Item fixedLabel>
                                    <Label>Password</Label>
                                    <Input value={this.state.user.password}/>
                                </Item>
                            </Form>
                            <CardItem>
                                <Left>
                                    <Button transparent textStyle={{ color: '#87838B' }}>
                                        <Icon style={{ color: 'orange' }} name="paw" />
                                        <Text style={{ color: 'orange', fontSize: 16 }}>1,926 point</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Container>
                    </CardItem>
                </Card>
            </Content>

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