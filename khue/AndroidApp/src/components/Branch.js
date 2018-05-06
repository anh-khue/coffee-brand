import React, { Component } from 'react';
import { Image, Center, StatusBar } from 'react-native';
import { Container, View, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner, Card, CardItem, Thumbnail, Row, Col, Grid, DeckSwiper } from 'native-base';
import StarRating from 'react-native-star-rating';

const googleDriveImageUrl = 'https://drive.google.com/uc?id='

// const cards = [
//     {
//         text: 'Image One',
//         name: 'One',
//         image: require('../images/background.jpeg'),
//     },
//     {
//         text: 'Image Two',
//         name: 'Two',
//         image: require('../images/background2.jpeg'),
//     },
//     {
//         text: 'Image Three',
//         name: 'Three',
//         image: require('../images/background3.jpeg'),
//     }
// ];


export default class Branch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            starCount: 3.5,
            branchName: '',
            branchAddress: '',
            coverUrl: '',
            cards: []
        };
    }

    onStarRatingPress(rating) {
        fetch('http://192.168.1.6:8000/branches/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branchId: 1,
                customerId: 3,
                id: 0,
                star: 2
            })
        })
        .then(res => {
            console.log(res.status)
        })
        this.setState({
            starCount: rating
        });
    }

    async componentWillMount() {


        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });

        fetch('http://192.168.1.6:8000/branches/1')
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json)
                this.setState({
                    starCount: parseFloat(json.rating),
                    branchName: json.name,
                    branchAddress: json.address,
                    coverUrl: googleDriveImageUrl + json.coverImageId,
                    // loading: false
                })
                console.log(this.state.coverUrl)
            });

        fetch('http://192.168.1.6:8000/branches/1/images')
            .then(res => {
                return res.json()
            }).then(json => {
                console.log(json)
                let cards = this.state.cardS
                cards = json.map(coverURL => {
                    return {
                        text: 'a',
                        name: 'a',
                        image: {
                            uri: googleDriveImageUrl + coverURL
                        }
                    }
                })
                console.log(cards)
                this.setState({
                    cards: cards,
                    loading: false
                })
            })
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
            <Container scrollEnabled={false}>
                <Header style={{ marginTop: StatusBar.currentHeight, }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Branch</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card style={{ marginTop: 10 }}>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.coverUrl }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            {/* <Thumbnail source={require('../images/logo.png')}/> */}
                            <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{(this.state.branchName)}</Text>
                                <Text style={{ color: '#A9A9A9' }}>{(this.state.branchAddress)}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col size={2} />
                                <Col style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={this.state.starCount}
                                        fullStarColor={'#ffd700'}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </Col>
                                <Col size={2} />
                            </Grid>
                        </CardItem>
                    </Card>
                    <Container style={{ height: 280 }}>
                        <DeckSwiper
                            dataSource={this.state.cards}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem cardBody>
                                        <Image source={{ uri: item.image.uri }} style={{ height: 300, flex: 1 }} />
                                    </CardItem>
                                </Card>
                            }
                        />
                    </Container>
                </Content>
            </Container>
        );
    }
}