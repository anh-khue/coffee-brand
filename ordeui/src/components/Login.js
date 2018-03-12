import React from 'react'
import {Card, Icon, Image, Input, Divider, Button, Grid} from 'semantic-ui-react'
import background from '../images/coffeeworkspace.jpg'

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
                    <Card raised color='blue' fluid style={{backgroundColor: '#e6ecf7'}}>
                        <Card.Content textAlign='center'>
                            <Card.Header>
                                COBRA LOGIN
                            </Card.Header>
                            <Card.Meta>
                                    <span className="date">Coffee Brand</span>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                    <Card raised fluid style={{height: '200px', backgroundColor: '#e6ecf7'}} >
                        <Card.Content textAlign='center' style={{transform: 'translateY(3%)'}} >
                            <Input onChange={(e, data) => this.update(data)} id='username' value={this.state.username} ref={e => this.username = e} icon='user' iconPosition='left' placeholder='Username'/>
                            <br/>
                            <br/>
                            <Input onChange={(e, data) => this.update(data)} id='password' value={this.state.password} ref={e => this.password = e} icon='lock' iconPosition='left' placeholder='Password' type='password' />
                            <Divider style={{backgroundColor: 'lightgrey'}}/>
                            <Button.Group>
                                <Button color='grey' onClick={() => this.reset()} >Reset</Button>
                                <Button.Or/>
                                {
                                    !this.state.loading? <Button onClick={() => this.submit()} positive>Login</Button>:<Button loading positive>Login</Button>
                                }
                                
                            </Button.Group>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        );
    }

    //submit to server
    submit(){
        this.setState({
            loading: true
        })
        //simulate response from server
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