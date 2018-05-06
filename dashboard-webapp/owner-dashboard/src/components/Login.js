import React from 'react'
import { Card, Icon, Image, Input, Divider, Button, Grid, Container } from 'semantic-ui-react'
import constant from '../constants'
import logo from '../images/logo.png'
import loginBg from '../images/login_bg.jpg'
import constants from '../constants';

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.username = undefined
        this.password = undefined
        this.state = {
            username: '',
            password: '',
            loading: false,
        }
    }

    render() {
        return (
            <div style={{
                height: '100%', width: '100%', position: 'absolute',
                background: 'url(' + loginBg + ') no-repeat center center', backgroundSize: 'cover'
            }}>
                <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'black', opacity: '0.5' }}></div>
                <div style={{
                    position: 'absolute', top: '50%', right: '50%',
                    transform: 'translate(50%, -50%)', width: '400px'
                }} >
                    <Image rounded centered circular size='medium' src={logo} style={{ transform: 'translateY(-20%)' }} />
                    <Container textAlign='center' fluid style={{ height: '200px', backgroundColor: 'transparent' }} >
                        <Input onChange={(e, data) => this.update(data)} id='username' value={this.state.username} ref={e => this.username = e} icon='user' iconPosition='left' placeholder='Username' />
                        <br />
                        <br />
                        <Input onChange={(e, data) => this.update(data)} id='password' value={this.state.password} ref={e => this.password = e} icon='lock' iconPosition='left' placeholder='Password' type='password' />
                        <Divider style={{ backgroundColor: 'transparent' }} />
                        <Button.Group>
                            <Button color='grey' onClick={() => this.reset()} >Reset</Button>
                            <Button.Or />
                            {
                                !this.state.loading ? <Button onClick={() => this.submit()} positive>Login</Button> : <Button loading positive>Login</Button>
                            }

                        </Button.Group>
                    </Container>
                </div>
            </div>
        );
    }

    //submit to server
    submit() {
        document.getElementById('username').style.border = ''
        document.getElementById('password').style.border = ''
        let loginURL = constants.domain + constants.login

        fetch(loginURL, {
            method: 'POST',
            // headers:{
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => {
            if(res.status==403){
                document.getElementById('username').style.border = '2px solid red'
                document.getElementById('password').style.border = '2px solid red'
            }else{
                for (var pair of res.headers.entries()) {
                    if (pair[0] == 'authorization') {
                        localStorage.setItem("JWToken", pair[1])
    
                        this.setState({
                            loading: true
                        })
    
                        setTimeout(() => {
                            this.props.handleSubmit(true)
                        }, 1000)
                    }
                }
            }
        })

        // this.setState({
        //     loading: true
        // })

        // let authorized = true
        // localStorage.setItem('JWToken', )

        // setTimeout(() => {
        //     this.props.handleSubmit(authorized)
        // }, 1000)
    }

    reset() {
        document.getElementById('username').style.border = ''
        document.getElementById('password').style.border = ''
        this.update({ id: 'username', value: '' })
        this.update({ id: 'password', value: '' })
    }

    update(data) {
        this.setState({
            [data.id]: data.value
        })
    }
}