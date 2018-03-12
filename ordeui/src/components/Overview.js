import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import pandaIcon from '../images/panda.png'

export default class Overview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            active: 0
        }
    }

    render(){
        return(
            <Sidebar.Pushable as={Segment} style={{position: 'absolute', height: '100%', width: '100%'}} >
                <Sidebar as={Menu} animation='push' width='wide' visible={true} icon='labeled' vertical inverted>
                    <Menu.Item name='home'>
                        <Image src={pandaIcon} circular size='tiny' inline style={{border: '2px solid #fff'}} />
                        <Header style={{color: '#fff'}}>
                            TuanDSE62171
                            <Header.Subheader style={{color: '#fff'}}>
                                Cashier
                            </Header.Subheader>
                        </Header>
                    </Menu.Item>
                    <Menu.Item onClick={() => this.switchTab(0)} name='bar chart' active={this.state.active==0} style={{cursor: 'pointer'}}>
                        <Icon name='bar chart' />
                        Overview
                    </Menu.Item>
                    <Menu.Item onClick={() => this.switchTab(1)} name='list ul' active={this.state.active==1} style={{cursor: 'pointer'}}>
                        <Icon name='list ul' />
                        Show all Orders
                    </Menu.Item>
                    <Menu.Item onClick={() => this.switchTab(2)} name='plus circle' active={this.state.active==2} style={{cursor: 'pointer'}}>
                        <Icon name='plus circle' />
                        Add new Order
                    </Menu.Item>
                    <Menu.Item onClick={() => this.logout()} name='log out' style={{cursor: 'pointer', position: 'absolute', bottom: '0', width: '100%', borderTop: '1px solid #353535'}}>
                        <Icon name='log out' flipped='horizontally' />
                        Logout
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }

    switchTab(index){
        this.setState({
            active: index
        })
    }

    logout(){
        this.props.handleLogout(false)
    }
}