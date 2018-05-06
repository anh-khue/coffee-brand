import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner } from 'native-base';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
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
            return (
                <Container>
                    <Header />
                    <Content>
                        <Spinner color='blue' />
                    </Content>
                </Container>
            );
        }
        return (
            <Container>
                <Header>
                    {/* <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right /> */}
                </Header>
                <Content>
                    <Text>
                        This is Content Section
                    </Text>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical active>
                            <Icon name="navigate" />
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon active name="person" />
                            <Text>Information</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}