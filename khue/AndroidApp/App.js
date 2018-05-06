import React from 'react';
import {StyleSheet, Text, View, StatusBar } from 'react-native';
import Login from'./src/pages/Login';
import { Container } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#1c313a" barStyle="light-content"/>
        <Login/>
      </Container>
    );
  }
}