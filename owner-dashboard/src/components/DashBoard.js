import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label } from 'semantic-ui-react'
import TabRenderer from '../tabs/Tabs'
import pandaIcon from '../images/panda.png'

export default class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            active: 0,
            sideBarVisible: true
        }

        this.handleCloseModal.bind(this)

        this.offsetWidth

        this.data = [
            {
                name: 'A',
                value: 106
            },
            {
                name: 'B',
                value: 98
            },
            {
                name: 'C',
                value: 34
            },
            {
                name: 'D',
                value: 72
            },
            {
                name: 'E',
                value: 199
            },
            {
                name: 'F',
                value: 20
            },
            {
                name: 'G',
                value: 157
            },
        ]
    }

    render(){
        return(
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} style={{backgroundColor: '#4680ff'}} id='side-bar' animation='push' width='wide' visible={this.state.sideBarVisible} icon='labeled' vertical inverted>
                    {
                        this.state.sideBarVisible?
                        <Label color='white' onClick={() => this.toggleSidebar(this.state.sideBarVisible)} corner='right' style={{cursor: 'pointer'}}>
                        <Icon style={{cursor: 'pointer'}} name={this.state.sideBarVisible?'chevron left':'chevron right'}/>
                    </Label>:null
                    }
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
                    <Menu.Item onClick={() => this.logout()} name='log out' style={{cursor: 'pointer', position: 'absolute', bottom: '0', width: '100%', borderTop: '1px solid white'}}>
                        <Icon name='log out' flipped='horizontally' />
                        Logout
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher style={{backgroundColor: '#e1e4ea'}}>
                    {
                        !this.state.sideBarVisible?
                            <Label color='white' onClick={() => this.toggleSidebar(this.state.sideBarVisible)} corner='left' style={{cursor: 'pointer'}}>
                                <Icon style={{cursor: 'pointer'}} name={this.state.sideBarVisible?'chevron left':'chevron right'}/>
                            </Label>
                        :null
                    }
                    <TabRenderer info={{active: this.state.active, data: this.data,
                     handleCloseModal: () => this.handleCloseModal(), offsetWidth: this.offsetWidth,
                     sideBarVisible: this.state.sideBarVisible}}/>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }

    componentDidMount(){
        let sideBar = document.getElementById('side-bar')
        let width = sideBar.offsetWidth
        this.offsetWidth = width
    }

    handleCloseModal(){
        this.setState({
            active: 0
        })
    }

    toggleSidebar(state){
        this.setState({
            sideBarVisible: !state
        })
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