import React from 'react'
import {Card, Icon, Image, Input, Divider, Button, Grid, Container} from 'semantic-ui-react'
import background from '../images/coffeeworkspace.jpg'
import constant from '../constants'
import logo from '../images/cobra-icon-v2.png'

export default class Login extends React.Component{
    constructor(props){
        super(props)

        this.username = undefined
        this.password = undefined
        this.state = {
            username: '',
            password: '',
            loading: false,
        }
    }

    render(){
        return(
            <div style={{height: '100%', width: '100%', position: 'absolute',
             background: 'url('+background+') no-repeat center center', backgroundSize: 'cover'}}>
                <div style={{position: 'absolute', top: '50%', right: '50%',
                transform: 'translate(50%, -50%)', width: '400px'}} >
                    {/* <Card raised color='blue' fluid style={{backgroundColor: '#e6ecf7'}}>
                        <Card.Content textAlign='center'>
                            <Card.Header>
                                COBRA LOGIN
                            </Card.Header>
                            <Card.Meta>
                                    <span className="date">Coffee Brand</span>
                            </Card.Meta>
                        </Card.Content>
                    </Card> */}
                    <Image src={logo} style={{transform: 'translateY(20%)'}}/>
                    <Container textAlign='center' fluid style={{height: '200px', backgroundColor: 'transparent'}} >
                            <Input onChange={(e, data) => this.update(data)} id='username' value={this.state.username} ref={e => this.username = e} icon='user' iconPosition='left' placeholder='Username'/>
                            <br/>
                            <br/>
                            <Input onChange={(e, data) => this.update(data)} id='password' value={this.state.password} ref={e => this.password = e} icon='lock' iconPosition='left' placeholder='Password' type='password' />
                            <Divider style={{backgroundColor: 'transparent'}}/>
                            <Button.Group>
                                <Button color='grey' onClick={() => this.reset()} >Reset</Button>
                                <Button.Or/>
                                {
                                    !this.state.loading? <Button onClick={() => this.submit()} positive>Login</Button>:<Button loading positive>Login</Button>
                                }
                                
                            </Button.Group>
                    </Container>
                </div>
            </div>
        );
    }

    //submit to server
    submit(){
        // document.getElementById("username").style.border = ''
        // document.getElementById("password").style.border = ''

        // let email = this.state.username
        // let password = this.state.password
        // fetch(constant.service.domain + constant.service.login.name + constant.service.login.signin, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email: email,
        //         password: password
        //     })
        // }).then(res => {
        //     if (res.status == 200) {
        //         this.setState({
        //             loading: true
        //         })
        //         // assume it's valid
        //         let authorized = true

        //         //demo
        //         setTimeout(() => {
        //             this.props.handleSubmit(authorized)
        //         }, 1000)
        //     }else if(res.status==404){
        //         document.getElementById("username").style.border = '1.2px solid red'
        //         document.getElementById("password").style.border = '1.2px solid red'
        //     }
        // })

        this.setState({
            loading: true
        })
        // assume it's valid
        let authorized = true
        
        //demo
        setTimeout(() => {
            this.props.handleSubmit(authorized)
        }, 1000)
    }

    reset(){
        this.update({id: 'username', value: ''})
        this.update({id: 'password', value: ''})
    }

    update(data){
        this.setState({
            [data.id]: data.value
        })
    }
}