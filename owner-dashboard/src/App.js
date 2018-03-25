import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import DashBoard from './components/DashBoard'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      authorized: false
    }

    this.handleSubmit.bind(this)

  }

  render() {
    let JWToken = localStorage.getItem('JWToken')
    if(this.state.authorized || (JWToken != '' && JWToken != undefined && JWToken != null)){
      return (
        <DashBoard handleLogout={(response) => this.handleSubmit(response)} />
      );
    }else{
      return (
        <Login handleSubmit={(response) => this.handleSubmit(response)} />
      );
    }
  }

  handleSubmit(response){
    this.setState({
      authorized: response
    })
  }

}

export default App;
