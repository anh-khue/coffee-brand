import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label } from 'semantic-ui-react'
import TabRenderer from '../tabs/Tabs'
import sunsetImg from '../images/sunset.jpg'
import logoImg from '../images/logo.png'

export default class DashBoard extends React.Component {
    constructor(props) {
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

    render() {
        return (
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} style={{ background: 'url(' + sunsetImg + ') no-repeat center center', backgroundSize: 'cover' }} width='wide' visible={this.state.sideBarVisible} icon='labeled' vertical inverted>
                    <div style={{ height: '100%', backgroundColor: 'black', opacity: '0.65' }}>
                    </div>
                    <div style={{ position: 'absolute', top: '0', width: '100%', height: '100%' }}>
                        <Menu.Item name='home'>
                            <Image centered rounded size='small' src={logoImg} />
                            <Header size='large' style={{ color: '#fff' }}>
                                Restaurant
                            </Header>
                        </Menu.Item>
                        <Menu.Item onClick={() => this.switchTab(0)} name='list ul' active={this.state.active == 0} style={{ cursor: 'pointer' }}>
                            <Icon name='food' />
                            Manage items
                    </Menu.Item>
                        <Menu.Item onClick={() => this.switchTab(1)} name='plus circle' active={this.state.active == 1} style={{ cursor: 'pointer' }}>
                            <Icon name='archive' />
                            Manage tables
                    </Menu.Item>
                        <Menu.Item onClick={() => this.switchTab(2)} name='plus circle' active={this.state.active == 2} style={{ cursor: 'pointer' }}>
                            <Icon name='checkmark box' />
                            Manage orders
                    </Menu.Item>
                        <Menu.Item onClick={() => this.logout()} name='log out' style={{ cursor: 'pointer', backgroundColor: '', position: 'absolute', bottom: '0', width: '100%', borderTop: '1px solid black' }}>
                            <Icon name='log out' flipped='horizontally' />
                            Logout
                    </Menu.Item>
                    </div>
                </Sidebar>
                <Sidebar.Pusher style={{ backgroundColor: '#e1e4ea', height: window.innerHeight }}>
                    {
                        !this.state.sideBarVisible ?
                            <Label onClick={() => this.toggleSidebar(this.state.sideBarVisible)} corner='left' style={{ cursor: 'pointer' }}>
                                <Icon style={{ cursor: 'pointer' }} name={this.state.sideBarVisible ? 'chevron left' : 'chevron right'} />
                            </Label>
                            : null
                    }
                    <TabRenderer info={{
                        active: this.state.active, data: this.data,
                        handleCloseModal: () => this.handleCloseModal(), offsetWidth: this.offsetWidth,
                        sideBarVisible: this.state.sideBarVisible
                    }} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }

    handleCloseModal() {
        this.setState({
            active: 0
        })
    }

    toggleSidebar(state) {
        this.setState({
            sideBarVisible: !state
        })
    }

    switchTab(index) {
        this.setState({
            active: index
        })
    }

    logout() {
        localStorage.removeItem('JWToken')
        this.props.handleLogout(false)
    }
}