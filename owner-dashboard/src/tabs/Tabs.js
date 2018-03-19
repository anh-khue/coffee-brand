import React from 'react'
import { Modal, Header, Icon, Image, Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Container, Divider, Grid, Input } from 'semantic-ui-react'
import { Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import coffeImg from '../images/coffee.jpg'

export default class TabRenderer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        switch (this.props.info.active) {
            case 0:
                return (
                    <Overview data={this.props.info.data} />
                )
                break;
            case 1:
                return (
                    null
                )
                break;
            case 2:
                return <NewOrder handleCloseModal={this.props.info.handleCloseModal} offsetWidth={this.props.info.offsetWidth}
                    sideBarVisible={this.props.info.sideBarVisible} />
                break;
        }
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props)

        this.compName = 'Overview'

        this.data = [{ name: 360, value: 360 }]

        this.colors = ['#E9C46A', '#E76F51', '#59F8E8', '#941C2F', '#03191E', '#1EFC1E', '#2A9D8F']
    }

    render() {
        return (
            <ResponsiveContainer width={500} height={500}>
                <PieChart style={{ marginLeft: '50%', transform: 'translateX(50%)' }}>
                    <Pie fill={'#8884d8'} data={this.data} innerRadius='70%' nameKey='name' dataKey='value' >
                        <Cell stroke={'#8884d8'} />
                    </Pie>
                    <Pie fill={'mediumaquamarine'} outerRadius='60%' data={this.data}>
                        <Cell stroke={'mediumaquamarine'} />
                    </Pie>
                    <text x='50%' y='60%' textAnchor='middle' fontSize='140'>7</text>
                </PieChart>
            </ResponsiveContainer>
        )
    }

}

class NewOrder extends React.Component {
    constructor(props) {
        super(props)

        this.driveURL = 'https://drive.google.com/uc?id='
        this.state = {
            open: true,
            customerName: '',
            animate: this.props.sideBarVisible,
            columns: this.props.sideBarVisible ? 3 : 4,
            data: [],
            orders: [], // in orders array each element is the same in data with addition of field 'count'
            orderId: undefined
        }

        //=============== FAKE DATA ====================
        this.data = [
            {
                "id": 1,
                "name": "Black Coffee",
                "price": 18000,
                "discount": 0,
                "unit": 1,
                "createdDate": null,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 3,
                    "type": "Coffee",
                    "description": null
                },
                "typeId": 3
            },
            {
                "id": 2,
                "name": "Milk Coffee",
                "price": 19000,
                "discount": 0,
                "unit": 1,
                "createdDate": null,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 3,
                    "type": "Coffee",
                    "description": null
                },
                "typeId": 3
            },
            {
                "id": 3,
                "name": "Peach Tea",
                "price": 23000,
                "discount": 0,
                "unit": 1,
                "createdDate": null,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 5,
                    "type": "Tea",
                    "description": null
                },
                "typeId": 5
            },
            {
                "id": 4,
                "name": "Milk Tea",
                "price": 18000,
                "discount": 0,
                "unit": 1,
                "createdDate": null,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 5,
                    "type": "Tea",
                    "description": null
                },
                "typeId": 5
            },
            {
                "id": 5,
                "name": "Cream Puffin",
                "price": 25000,
                "discount": 0,
                "unit": 4,
                "createdDate": null,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 1,
                    "type": "Cake",
                    "description": null
                },
                "typeId": 1
            },
            {
                "id": 40,
                "name": "Cappuccino",
                "price": 30000,
                "discount": 10,
                "unit": 1,
                "createdDate": 1521022952000,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 3,
                    "type": "Coffee",
                    "description": null
                },
                "typeId": 3
            },
            {
                "id": 41,
                "name": "Matcha Latte",
                "price": 32000,
                "discount": 0,
                "unit": 1,
                "createdDate": 1521022952000,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 3,
                    "type": "Coffee",
                    "description": null
                },
                "typeId": 3
            },
            {
                "id": 42,
                "name": "Mint Soda",
                "price": 28000,
                "discount": 0,
                "unit": 1,
                "createdDate": 1521022952000,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 4,
                    "type": "Beverage",
                    "description": null
                },
                "typeId": 4
            },
            {
                "id": 43,
                "name": "Blue Soda",
                "price": 30000,
                "discount": 5,
                "unit": 1,
                "createdDate": 1521022952000,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 4,
                    "type": "Beverage",
                    "description": null
                },
                "typeId": 4
            },
            {
                "id": 44,
                "name": "Strawberry Soda",
                "price": 28000,
                "discount": 0,
                "unit": 1,
                "createdDate": 1521022952000,
                "imageId": "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m",
                "typeByTypeId": {
                    "id": 4,
                    "type": "Beverage",
                    "description": null
                },
                "typeId": 4
            }
        ]

        this.compName = 'NewOrder'

        this.stickyRef
    }

    render() {
        if (this.state.open) {
            return (
                <Modal open={this.state.open} closeOnDimmerClick={false} closeOnDocumentClick={false} closeIcon onClose={() => this.close()}>
                    <Header as='h2'>
                        <Icon size='small' name='wordpress forms' />
                        <Header.Content>
                            Please enter customer's information
                        </Header.Content>
                    </Header>
                    <Modal.Content>
                        <Form size='huge'>
                            <Form.Field>
                                <label>Customer's name</label>
                                <input placeholder="Left blank if it's new customer..." type='text' onChange={(e) => this.handleChange(e)} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' content='Proceed' onClick={() => this.handleSubmitForm()} />
                    </Modal.Actions>
                </Modal>
            )
        } else {
            let customerName = (this.state.customerName == '' ? 'New Customer' : this.state.customerName)
            let total = this.state.orders.reduce((acc, drink) => {
                acc += (drink.price - (drink.price * drink.discount / 100)) * drink.count
                return acc
            }, 0)
            let processedData = []
            let rawData = this.state.data
            rawData.reduce((acc, current, i) => {
                acc.push(current)
                if (acc.length % (this.state.columns) == 0) {
                    processedData.push(acc)
                    acc = []
                } else if ((i + 1) == rawData.length) {
                    processedData.push(acc)
                }
                return acc
            }, [])
            return (
                <div>
                    <Segment style={{ width: '50%', marginLeft: '1.5%', float: 'left' }} >
                        <Grid>
                            <Grid.Row columns={6}>
                                <Grid.Column>
                                    <Label as='a' tag>Type 1</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Label as='a' tag>Type 2</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Label as='a' tag>Type 3</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Label as='a' tag>Type 4</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Label as='a' tag>Type 5</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Label as='a' tag>Type 6</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment id='list-drink' style={{
                        width: '50%', height: (window.innerHeight - (window.innerHeight / 6)), float: 'left', marginLeft: '1.5%',
                        overflowY: 'scroll'
                    }} >
                        <Grid>
                            {
                                processedData.map((rowData, index) => {
                                    return (
                                        <Grid.Row key={this.compName + index} columns={this.state.columns}>
                                            {
                                                rowData.map((data, i) => {
                                                    return (
                                                        <Grid.Column key={this.compName + 'Sub' + i} >
                                                            {/* <Transition transitionOnMount visible={this.state.animate} onHide={() => this.onHideCardAnimation()} animation='pulse' duration={300}> */}
                                                            <Card onClick={e => this.handleAddDrink(data)} >
                                                                <Image style={{ height: '200px' }} src={this.driveURL + data.imageId} />
                                                                <Card.Content>
                                                                    <Card.Header>
                                                                        {data.name}
                                                                        {
                                                                            data.discount != 0 ?
                                                                                (<Label color='red' icon='percent' corner='right' />)
                                                                                : null
                                                                        }
                                                                    </Card.Header>
                                                                    <Card.Meta>
                                                                        <span className="date">
                                                                            {data.typeByTypeId.type}
                                                                        </span>
                                                                    </Card.Meta>
                                                                </Card.Content>
                                                                <Card.Content extra>
                                                                    <Icon name='money' />
                                                                    {data.price}
                                                                    {
                                                                        data.discount != 0 ?
                                                                            (' - ' + data.discount + '% = ' + (data.price - (data.price * data.discount / 100)))
                                                                            : null
                                                                    }
                                                                </Card.Content>
                                                            </Card>
                                                            {/* </Transition> */}
                                                        </Grid.Column>
                                                    )
                                                })
                                            }
                                        </Grid.Row>
                                    )
                                })
                            }
                        </Grid>
                    </Segment>
                    <Transition visible={this.props.sideBarVisible} onStart={() => this.onCompleteBillAnimation()}
                        onHide={() => this.onHideBillAnimation()} animation='fly left' duration={this.props.sideBarVisible ? 1000 : 10}>
                        <Sticky context={this.stickyRef} id='bill' style={{ marginRight: this.props.offsetWidth, marginTop: window.innerHeight / 30 }}>
                            <Segment raised style={{ height: (window.innerHeight - (window.innerHeight / 6)) }} compact floated='right'>
                                <Grid>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <Button onClick={() => this.handleCheckout()} color='blue' content='Checkout' fluid size='large' />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Label ribbon='right' content='Customer Bill' color='red' size='big' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Segment basic>
                                    <Card>
                                        <Card.Content textAlign='center'>
                                            <Card.Header>
                                                Bill No.123
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className="date">COBRA</span>
                                            </Card.Meta>
                                            <Card.Description>
                                                <Input style={{ float: 'right' }} label='Customner' transparent disabled value={' ' + customerName} />
                                                <br />
                                                <br />
                                                <Input style={{ float: 'right' }} label='Total' transparent disabled value={' ' + Math.ceil(total)} />
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Segment>
                                <Divider style={{ backgroundColor: 'lightgrey' }} />
                                <div style={{ overflowY: 'scroll', height: '60%' }}>
                                    <Segment basic>
                                        {
                                            this.state.orders.map(drink => {
                                                return (
                                                    <Card>
                                                        <Card.Content>
                                                            <Card.Description>
                                                                <Grid relaxed>
                                                                    <Grid.Row columns={4}>
                                                                        <Grid.Column>
                                                                            {drink.name}
                                                                        </Grid.Column>
                                                                        <Grid.Column textAlign='center' >
                                                                            {drink.count}
                                                                        </Grid.Column>
                                                                        <Grid.Column>
                                                                            {Math.ceil(drink.count * (drink.price - (drink.price * drink.discount / 100))) + ' VND'}
                                                                        </Grid.Column>
                                                                        <Grid.Column textAlign='center' verticalAlign='middle' >
                                                                            <Icon style={{ cursor: 'pointer' }} onClick={() => this.handleRemoveDrink(drink.id)} size='large' name='close' />
                                                                        </Grid.Column>
                                                                    </Grid.Row>
                                                                </Grid>
                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                )
                                            })
                                        }
                                    </Segment>
                                </div>
                            </Segment>
                        </Sticky>
                    </Transition>
                </div>
            )
        }
    }

    handleCheckout() {
        if (this.state.orderId) {
            fetch('http://192.168.100.178:9999/cobra-order-service/orders/' + this.state.orderId + '/checkout', {
                method: 'PUT'
            }).then(res => {
                return res.json()
            }).then(json => {
                console.log(json)
            })
        }
    }

    handleUpdateDrink(id, sustenance) {
        let orders = this.state.orders
        let drink = orders.find(d => d.id == sustenance.id)
        let orderDetail = {
            customerDiscountRate: 10,
            orderDetail: {
                orderId: id,
                price: sustenance.price,
                quantity: drink.count,
                sustenanceId: sustenance.id,
            },
            sustenanceDiscountRate: sustenance.discount
        }
        fetch('http://192.168.100.178:9999/cobra-order-service/order_details', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(orderDetail)
        }).then(res => {
            return res.json()
        }).then(json => {
            this.updateDrinkFromServer(json)
        })
    }

    createEmptyOrder() {
        let comp = this
        fetch('http://192.168.100.178:9999/cobra-order-service/orders', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                cashierId: 1,
                checkoutDate: null,
                createdDate: null,
                memberId: 1,
                status: 0,
                total: 0
            })
        }).then(res => {
            return res.json()
        }).then(json => {
            this.setState({ orderId: json.order.id })
        })
    }

    handleRemoveDrink(id) {
        let orders = this.state.orders
        let toBeDeletedDrink = orders.find(d => d.id == id)
        let index = orders.findIndex(d => d.id == id)
        let orderDetailId = toBeDeletedDrink.orderDetailId
        orders.splice(index, 1)
        fetch('http://192.168.100.178:9999/cobra-order-service/order_details/' + orderDetailId, {
            method: 'DELETE'
        }).then(res => {
            console.log(res.status)
        })
        this.setState({
            orders: orders
        })
    }

    updateDrinkFromServer(newOrder) {
        let orders = this.state.orders
        orders = orders.map(d => {
            if (d.id == newOrder.sustenanceId) {
                d.discount = newOrder.discountRate
                d.orderDetailId = newOrder.id
            }
            return d
        })
        this.setState(prevState => {
            return {
                orders: orders
            }
        })
    }

    handleAddDrink(sustenance) {
        if (this.state.orderId) {
            let drink = this.state.data.find(d => d.id == sustenance.id)
            let orders = this.state.orders
            let exist = orders.find(d => d.id == sustenance.id)
            if (exist) {
                orders = orders.map(d => {
                    if (d.id == exist.id) {
                        d.count += 1
                    }
                    return d
                })
            } else {
                drink.count = 1
                orders.push(drink)
            }
            this.setState(prevState => {
                return {
                    orders: orders
                }
            })
            this.handleUpdateDrink(this.state.orderId, sustenance)
        }
    }

    componentDidMount() {
        let comp = this
        fetch('http://192.168.100.178:9999/cobra-catalog-service/sustenance').then(res => {
            return res.json()
        }).then(json => {
            comp.setState({ data: json })
        })
    }

    onHideCardAnimation() {
        this.setState({
            animate: !this.state.animate
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            animate: !this.state.animate,
            columns: nextProps.sideBarVisible ? 3 : 4
        })
        let segmentListDrink = document.getElementById('list-drink')
        segmentListDrink.style.width = nextProps.sideBarVisible ? '50%' : '73%'
    }

    onCompleteBillAnimation() {
        if (this.props.sideBarVisible) {
            document.getElementById('bill').style.marginRight = this.props.offsetWidth + 'px'
        }
    }

    onHideBillAnimation() {
        if (!this.props.sideBarVisible) {
            document.getElementById('bill').style.marginRight = '0px'
            document.getElementById('bill').style.visibility = 'visible'
            document.getElementById('bill').style.display = 'block'
        }
    }

    handleSubmitForm() {
        let customerName = this.state.customerName
        this.createEmptyOrder()
        //this segment sends the customer name to server to validate
        // assume it's valid
        let response = true

        // => go to drinks menu
        this.setState({
            open: false
        })

    }

    handleChange(e) {
        this.setState({
            customerName: e.target.value
        })
    }

    close() {
        this.props.handleCloseModal()
    }
}