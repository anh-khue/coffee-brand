import React from 'react'
import { Modal, Header, Icon, Image, Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Divider, Grid, Input, Statistic, Accordion, Table, Pagination } from 'semantic-ui-react'
import { LineChart, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import coffeImg from '../images/coffee.jpg'

export default class TabRenderer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        switch (this.props.info.active) {
            case 0:
                return (
                    <Overview data={this.props.info.data} sideBarVisible={this.props.info.sideBarVisible} />
                )
                break;
            case 1:
                return (
                    <ManageBranches sideBarVisible={this.props.info.sideBarVisible} />
                )
                break;
            case 2:
                return <ManageSustenance />
                break;
            case 3:
                return (null)
                break;
        }
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props)

        this.compName = 'Overview'

        this.data = [
            {
                date: '14-03',
                sale: 3636
            },
            {
                date: '15-03',
                sale: 6054
            },
            {
                date: '16-03',
                sale: 7203
            },
            {
                date: '17-03',
                sale: 8799
            },
            {
                date: '18-03',
                sale: 6968
            },
            {
                date: '19-03',
                sale: 7184
            },
            {
                date: '20-03',
                sale: 5604
            }
        ]

        this.colors = ['#E9C46A', '#E76F51', '#59F8E8', '#941C2F', '#03191E', '#1EFC1E', '#2A9D8F']
    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '70%' : '95%'
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Segment style={{ width: responsiveWidth, marginTop: '1.5%', marginLeft: '1.5%' }}>
                            <Grid>
                                <Grid.Row columns={3} divided>
                                    <Grid.Column textAlign='center' >
                                        <Statistic>
                                            <Statistic.Value>
                                                <Icon name='checkmark box' />
                                                100
                                            </Statistic.Value>
                                            <Statistic.Label>Orders Sold</Statistic.Label>
                                        </Statistic>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center'>
                                        <Statistic>
                                            <Statistic.Value>
                                                <Icon name='user circle outline' />
                                                500
                                            </Statistic.Value>
                                            <Statistic.Label>Customers</Statistic.Label>
                                        </Statistic>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center'>
                                        <Statistic>
                                            <Statistic.Value>
                                                <Icon name='marker' />
                                                4
                                            </Statistic.Value>
                                            <Statistic.Label>Branches</Statistic.Label>
                                        </Statistic>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ height: (window.innerHeight - (window.innerHeight / 5)) }} >
                    <Grid.Column>
                        <Segment style={{ width: responsiveWidth, height: '100%', marginLeft: '1.5%' }}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header size='huge' style={{ marginTop: '1%', marginLeft: '1%' }} >
                                            <Icon name='line chart' />
                                            <Header.Content>
                                                Revenue of nearest 7 days
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ height: (window.innerHeight - (window.innerHeight / 3)) }}>
                                    <Grid.Column>
                                        <ResponsiveContainer>
                                            <LineChart data={this.data}>
                                                <XAxis dataKey={'date'}>
                                                </XAxis>
                                                <YAxis />
                                                <CartesianGrid strokeDasharray={'3 3'} />
                                                <Line dataKey={'sale'} stroke={'red'} strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }

}

class ManageBranches extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeAccordion: -1,
            branches: [],
            employees: [
                {
                    id: 1,
                    accountId: 4,
                    role: 'MANAGER',
                    firstName: 'Tuan',
                    lastName: 'Dao',
                    dateOfBirth: '1997-03-06T00:40:34.000+0000',
                    email: 'nhatdao@gmail.com',
                    phone: '0123456789',
                    branchId: 1
                },
                {
                    id: 2,
                    accountId: 2,
                    role: 'CASHIER',
                    firstName: 'Nhat',
                    lastName: 'Nguyen Quang',
                    dateOfBirth: '1990-03-19T00:40:34.000+0000',
                    email: 'nhatnguyenquang@gmail.com',
                    phone: '9876543210',
                    branchId: 2
                },
                {
                    id: 3,
                    accountId: 5,
                    role: 'WAITER/WAITRESS',
                    firstName: 'Cuong',
                    lastName: 'Mai Vu',
                    dateOfBirth: '1997-11-24T00:40:34.000+0000',
                    email: 'cuongmai@gmail.com',
                    phone: '9876543210',
                    branchId: 2
                }
            ],
            isEditing: false
        }

    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '70%' : '95%'
        return (
            <Accordion style={{ width: responsiveWidth, marginLeft: '1.5%', marginTop: '1.5%' }} >
                <Accordion.Title active={this.state.activeAccordion == 0} index={0} onClick={() => this.handleSwitchAccordion(0)}>
                    <Segment style={{ borderBottom: this.state.activeAccordion == 0 ? '2px solid blue' : '' }} raised={this.state.activeAccordion == 0} >
                        <Grid>
                            <Grid.Row verticalAlign='middle' columns={2}>
                                <Grid.Column>
                                    <Header size='large' >
                                        <Icon name='marker' size='big' />
                                        <Header.Content>
                                            Chi nhanh 1
                                            <Header.Subheader>
                                                11 Nguyen Oanh
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column >
                                    <Header floated='right' size='large'>
                                        <Icon name='info circle' />
                                        <Header.Content>
                                            Dao Tuan
                                            <Header.Subheader>
                                                Branch Manager
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Accordion.Title>
                <Accordion.Content style={{ width: '95%', marginLeft: '100%', transform: 'translateX(-100%)' }} active={this.state.activeAccordion == 0}>
                    <Transition animation='scale' visible={this.state.activeAccordion == 0} duration={{ hide: 1, show: 500 }} >
                        <Segment >
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Table celled>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Employee</Table.HeaderCell>
                                                    <Table.HeaderCell>DOB</Table.HeaderCell>
                                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                                    <Table.HeaderCell>Phone</Table.HeaderCell>
                                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {
                                                    this.state.employees.map(emp => {
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>
                                                                    <Header>
                                                                        <Icon name='user' />
                                                                        <Header.Content>
                                                                            {emp.lastName+' '+emp.firstName}
                                                                            <Header.Subheader>
                                                                                {emp.role}
                                                                            </Header.Subheader>
                                                                        </Header.Content>
                                                                    </Header>
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {
                                                                        (new Date(emp.dateOfBirth)).toLocaleDateString('vi-VN')
                                                                    }
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {emp.email}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {emp.phone}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Button compact>Edit</Button>
                                                                    <Button compact color='red' >Delete</Button>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        )
                                                    })
                                                }
                                            </Table.Body>
                                            <Table.Footer>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan={4}>
                                                        <Pagination defaultActivePage={1} totalPages={2} />
                                                    </Table.HeaderCell>
                                                    <Table.HeaderCell colSpan={1}>
                                                        <Button color='blue'>
                                                            <Icon name='add user' />
                                                            Add Employee
                                                        </Button>
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Footer>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Transition>
                </Accordion.Content>
                <Accordion.Title active={this.state.activeAccordion == 1} index={1} onClick={() => this.handleSwitchAccordion(1)}>
                    <Segment>
                        c
                    </Segment>
                </Accordion.Title>
                <Accordion.Content style={{ width: '90%', marginLeft: '100%', transform: 'translateX(-100%)' }} active={this.state.activeAccordion == 1}>
                    <Transition animation='scale' visible={this.state.activeAccordion == 1} duration={{ hide: 1, show: 500 }} >
                        <Segment>
                            d
                        </Segment>
                    </Transition>
                </Accordion.Content>
            </Accordion>
        )
    }

    handleSwitchAccordion(index) {
        this.setState(prevState => {
            return {
                activeAccordion: prevState.activeAccordion == index ? -1 : index
            }
        })
    }

    handleEdit(){
        
    }
}

class ManageSustenance extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        this.compName = 'ManageSustenance'
    }

    render() {

        return (
            null
        )
    }


}

