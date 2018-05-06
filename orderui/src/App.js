import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import DashBoard from './components/DashBoard'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      authorized: false,
      cashier: {}
    }

    this.handleSubmit.bind(this)

  }

  render() {
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    if(this.state.authorized || isLoggedIn == 'true'){
      return (
        <DashBoard handleLogout={(response) => this.handleSubmit(response)} cashier={this.state.cashier} />
      );
    }else{
      return (
        <Login handleSubmit={(response, cashier) => this.handleSubmit(response, cashier)} />
      );
    }
  }

  handleSubmit(response, cashier){
    this.setState({
      authorized: response,
      cashier: cashier
    })
  }

}

export default App;
