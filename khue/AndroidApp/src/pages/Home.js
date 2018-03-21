import React from 'react';
import {StyleSheet, View, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Branch from '../components/Branch';

export default class Home extends React.Component {
  render() {
    return (
        <Container>
        <StatusBar backgroundColor="#1c313a" barStyle="light-content"/>
            <Branch/>
        </Container>
    );
  }
}