import React from 'react';
import {StyleSheet, Text, View, StatusBar } from 'react-native';
import Login from'./src/pages/Login';
import { Container } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#301810" barStyle="light-content"/>
        <Login/>
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
