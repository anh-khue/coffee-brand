import React, { Component } from 'react';
import { Image, Center, StatusBar } from 'react-native';
import { Container, View, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner, Card, CardItem, Thumbnail, Row, Col, Grid, DeckSwiper } from 'native-base';
import StarRating from 'react-native-star-rating';

import Location from '../pages/Location.js';

const googleDriveImageUrl = 'https://drive.google.com/uc?id='

const branchServiceURL = 'http://192.168.43.19:9999/cobra-branch-service';

export default class Branch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            starCount: 3.5,
            branchName: '',
            branchAddress: '',
            coverUrl: '',
            cards: [],
            goToLocation: false
        };
    }

    onStarRatingPress(rating) {
        fetch(branchServiceURL + '/branches/' + this.props.branchId, {
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

        console.log(this.props.branchId)
        fetch(branchServiceURL + '/branches/' + this.props.branchId)
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

        fetch(branchServiceURL + '/branches/' + this.props.branchId + '/images')
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
        if (!this.state.goToLocation) {
            return (
                <Container style={{ height: window.innerHeight }}>
                    {/* <Header style={{ marginTop: StatusBar.currentHeight, }}>
                        <Left>
                            <Button transparent onPress={() => this.setState({ goToLocation: true })}>
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Branch</Title>
                        </Body>
                        <Right />
                    </Header> */}
                    <Content>
                        <Card>
                            <CardItem cardBody>
                                <Button style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0, zIndex: 999 }} onPress={() => this.setState({ goToLocation: true })}>
                                    <Icon name='arrow-back' />
                                </Button>
                                <Image source={{ uri: this.state.coverUrl }} style={{ height: 190, width: null, flex: 1 }} />
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
                                            halfStarEnabled={true}
                                            rating={this.state.starCount}
                                            fullStarColor={'#ffd700'}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                    </Col>
                                    <Col size={2} />
                                </Grid>
                            </CardItem>
                        </Card>
                        <Container style={{ height: 260 }}>
                            <DeckSwiper
                                dataSource={this.state.cards}
                                renderItem={item =>
                                    <Card style={{ elevation: 3 }}>
                                        <CardItem cardBody>
                                            <Image source={{ uri: item.image.uri }} style={{ height: 260, flex: 1 }} />
                                        </CardItem>
                                    </Card>
                                }
                            />
                        </Container>
                    </Content>
                </Container>
            );
        } else {
            return (
                <Location />
            )
        }
    }
}