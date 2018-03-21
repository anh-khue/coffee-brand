import React from 'react';
import {StyleSheet, View, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Fragment from '../components/fragment.js';

export default class Home extends React.Component {
  render() {
    return (
        <Container>
        <StatusBar backgroundColor="#1c313a" barStyle="light-content"/>
            <Fragment/>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
