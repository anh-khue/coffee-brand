import React from 'react'
import { Modal, Header, Icon, Image, Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Container, Divider, Grid, Input, Accordion, Statistic } from 'semantic-ui-react'
import { Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import coffeImg from '../images/coffee.jpg'
import constant from '../constants'
import constants from '../constants';

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
                    <AllOrder sideBarVisible={this.props.info.sideBarVisible} />
                )
                break;
            case 2:
                return <NewOrder handleCloseModal={this.props.info.handleCloseModal} offsetWidth={this.props.info.offsetWidth}
                    sideBarVisible={this.props.info.sideBarVisible} cashier={this.props.info.cashier} />
                break;
        }
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }

        this.compName = 'Overview'

        this.data = [{ name: 360, value: 360 }]

        this.colors = ['#E9C46A', '#E76F51', '#59F8E8', '#941C2F', '#03191E', '#1EFC1E', '#2A9D8F']
    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '75%' : '95%'
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
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Header size='huge' style={{ marginTop: '1%', marginLeft: '1%' }} >
                                            <Icon name='pie chart' />
                                            <Header.Content>
                                                Total orders of today
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header size='huge' style={{ marginTop: '1%', marginLeft: '1%' }} >
                                            <Icon name='bar chart' />
                                            <Header.Content>
                                                Top sustenance of the day
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ height: (window.innerHeight - (window.innerHeight / 3)) }} columns={2}>
                                    <Grid.Column>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie fill={'#8884d8'} data={this.data} innerRadius='70%' nameKey='name' dataKey='value'>
                                                    <Cell stroke={'#8884d8'} />
                                                </Pie>
                                                <Pie fill={'mediumaquamarine'} outerRadius='60%' data={this.data} nameKey='name' dataKey='value'>
                                                    <Cell stroke={'mediumaquamarine'} />
                                                </Pie>
                                                <text x='50%' y='60%' textAnchor='middle' fontSize='140'>{this.state.orders.length}</text>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <ResponsiveContainer>
                                            <BarChart>
                                                {/* <Pie fill={'#8884d8'} data={this.data} innerRadius='70%' nameKey='name' dataKey='value'>
                                                    <Cell stroke={'#8884d8'} />
                                                </Pie>
                                                <Pie fill={'mediumaquamarine'} outerRadius='60%' data={this.data} nameKey='name' dataKey='value'>
                                                    <Cell stroke={'mediumaquamarine'} />
                                                </Pie>
                                                <text x='50%' y='60%' textAnchor='middle' fontSize='140'>{this.state.orders.length}</text> */}
                                            </BarChart>
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

    componentWillMount() {
        let urlOrders = constants.service.domain + constants.service.order.name + constants.service.order.all
        fetch(urlOrders).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                orders: json
            })
        })
    }

}

class NewOrder extends React.Component {
    constructor(props) {
        super(props)

        this.driveURL = 'https://drive.google.com/uc?id='
        this.state = {
            open: true,
            customerEmail: '',
            animate: this.props.sideBarVisible,
            columns: this.props.sideBarVisible ? 3 : 4,
            data: [],
            orders: [], // in orders array each element is the same in data with addition of field 'count'
            orderId: undefined,
            types: [],
            typeIdToFilter: -1,
            employees: [],
            cashier: this.props.cashier,
            customer: {}
        }

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
                            Please enter customer's email
                        </Header.Content>
                    </Header>
                    <Modal.Content>
                        <Form size='huge'>
                            <Form.Field>
                                <label>Customer's email</label>
                                <input id='customer-email' placeholder="Left blank if it's new customer..." type='text' onChange={(e) => this.handleChange(e)} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' content='Proceed' onClick={() => this.handleSubmitForm()} />
                    </Modal.Actions>
                </Modal>
            )
        } else {
            let customerEmail = (this.state.customerEmail == '' ? 'New Customer' : this.state.customerEmail)
            let total = this.state.orders.reduce((acc, drink) => {
                acc += (drink.price - (drink.price * drink.discount / 100)) * drink.count
                return acc
            }, 0)
            let processedData = []
            let rawData = this.state.data.filter(d => d.showOnFilter)
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
                            <Grid.Row columns={this.state.types.length}>
                                {
                                    this.state.types.map(type => {
                                        return (
                                            <Grid.Column>
                                                <Label style={this.state.typeIdToFilter == type.id ? { color: 'white', backgroundColor: 'red' } : null} onClick={() => this.handleFilter(type.id)} as='a' tag>{type.type}</Label>
                                            </Grid.Column>
                                        )
                                    })
                                }
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
                                                <Input style={{ float: 'right' }} label='Customner' transparent disabled value={' ' + customerEmail} />
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

    handleFilter(typeId) {
        let id = typeId
        let data = this.state.data
        if (this.state.typeIdToFilter != id) {
            data = data.map(d => {
                if (d.typeByTypeId.id == id) {
                    d.showOnFilter = true
                } else {
                    d.showOnFilter = false
                }
                return d
            })
        } else {
            id = -1
            data = data.map(d => {
                d.showOnFilter = true
                return d
            })
        }
        this.setState({
            data: data,
            typeIdToFilter: id
        })
    }

    handleCheckout() {
        if (this.state.orderId) {
            let url = constant.service.domain + constant.service.order.name + constant.service.order.all
            fetch(url + '/' + this.state.orderId + '/checkout', {
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
        let url = constant.service.domain + constant.service.orderDetail.name + constant.service.orderDetail.all
        fetch(url, {
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
        let url = constant.service.domain + constant.service.order.name + constant.service.order.all
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                cashierId: this.state.cashier.id,
                branchId: this.state.cashier.branchId,
                checkoutDate: null,
                createdDate: null,
                memberId: this.state.customer.id,
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
        let url = constant.service.domain + constant.service.orderDetail.name + constant.service.orderDetail.all
        fetch(url + '/' + orderDetailId, {
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

    componentWillMount() {
        let urlAllSustenance = constant.service.domain + constant.service.catalog.name + constant.service.catalog.all
        fetch(urlAllSustenance).then(res => {
            return res.json()
        }).then(json => {
            json = json.map(d => {
                d.showOnFilter = true
                return d
            })
            this.setState({ data: json })
        })
        let urlAllTypes = constant.service.domain + constant.service.type.name + constant.service.type.all
        fetch(urlAllTypes).then(res => {
            return res.json()
        }).then(json => {
            this.setState({ types: json })
        })
        
        let urlEmployees = constants.service.domain+constants.service.employee.name+constants.service.employee.all
        fetch(urlEmployees).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                employees: json
            })
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
        document.getElementById('customer-email').style.border = ''
        let customerEmail = this.state.customerEmail
        let urlCustomer = constants.service.domain + constants.service.customer.name + constants.service.customer.getByEmail
        urlCustomer = urlCustomer.replace('{email}', this.state.customerEmail)

        fetch(urlCustomer).then(res => {
            if (res.status == 200) {
                return res.json()
            }else{
                document.getElementById('customer-email').style.border = '1.2px solid red'
            }
        }).then(json => {
            if (json) {
                this.setState({
                    customer: json,
                    open: false
                })
            }
            this.createEmptyOrder()
        })
        // this.setState({
        //     open: false
        // })
    }

    handleChange(e) {
        this.setState({
            customerEmail: e.target.value
        })
    }

    close() {
        this.props.handleCloseModal()
    }
}

class AllOrder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0,
            orders: [],
            activeAccordion: -1,
            activeSubAccordion: -1
        }
    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '75%' : '95%'
        return (
            <div style={{ overflowY: 'scroll', height: '100%' }}>
                <Grid style={{ width: responsiveWidth, marginLeft: '1.5%', marginTop: '1.5%' }} >
                    <Grid.Row columns={2}>
                        <Grid.Column width={16}>
                            <Accordion>
                                {
                                    this.state.orders.map((customOrder, index) => {
                                        let order = customOrder.order
                                        {/* this.getAccountByAccountId(order.cashierId)
                                        let account = this.account
                                        let cashier = this.state.employees.filter(emp => emp.accountId == account.id && emp.role == account.role.name)
                                        let orderDetailInThisOrder = this.state.orderdetails.filter(orderdetail => orderdetail.orderId == order.id) */}
                                        return (
                                            <div>
                                                <Accordion.Title active={this.state.activeAccordion == index} index={index} onClick={() => this.handleSwitchAccordion(index)}>
                                                    <Segment style={{ borderBottom: this.state.activeAccordion == index ? '2px solid blue' : '' }} raised={this.state.activeAccordion == index} >
                                                        <Grid>
                                                            <Grid.Row verticalAlign='middle' >
                                                                <Grid.Column width={10}>
                                                                    <Header size='large'>
                                                                        <Icon name='checkmark box' size='big' />
                                                                        <Header.Content>
                                                                            a
                                                                        </Header.Content>
                                                                    </Header>
                                                                </Grid.Column>
                                                                <Grid.Column textAlign='center' width={6}>
                                                                    <Statistic floated='right'>
                                                                        <Statistic.Value>
                                                                            a
                                                                        </Statistic.Value>
                                                                        <Statistic.Label>
                                                                            Items
                                                                </Statistic.Label>
                                                                    </Statistic>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </Segment>
                                                </Accordion.Title>
                                                {/* {
                                                    orderDetailInThisOrder.map((orderdetail, i) => {
                                                        return (
                                                            <Accordion.Content style={{ width: '95%', marginLeft: '100%', transform: 'translateX(-100%)', padding: '0%' }} active={this.state.activeAccordion == index}>
                                                                <Transition animation='scale' visible={this.state.activeAccordion == index} duration={{ hide: 1, show: 350 }} >
                                                                    <Accordion.Title active={this.state.activeSubAccordion == i} index={i} onClick={() => this.handleSwitchSubAccordion(i)}>
                                                                        <Segment style={{ borderBottom: this.state.activeSubAccordion == i ? '2px solid red' : '' }} raised={this.state.activeSubAccordion == i} >
                                                                            <Grid>
                                                                                <Grid.Row verticalAlign='middle' columns={'equal'}>
                                                                                    <Grid.Column width={9}>
                                                                                        <Header size='large' >
                                                                                            <Header.Content>
                                                                                                {orderdetail.id}
                                                                                            </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                            </Grid>
                                                                        </Segment>
                                                                    </Accordion.Title>
                                                                </Transition>
                                                                <Accordion.Content style={{ width: '95%', marginLeft: '100%', transform: 'translateX(-100%)' }} active={this.state.activeSubAccordion == i}>
                                                                    <Transition animation='scale' visible={this.state.activeSubAccordion == i} duration={{ hide: 1, show: 350 }}>
                                                                        <Segment >
                                                                            <Grid>
                                                                                <Grid.Row columns={2}>
                                                                                    <Grid.Column>
                                                                                        <Image src={this.state.sustenanceImage ? this.state.sustenanceImage.url : this.driveURL + sustenance.imageId} />
                                                                                        <input type='file' onChange={() => this.handleLoadImage()} style={{ display: 'none', visibility: 'hidden' }} id='sustenance-image' />
                                                                                    </Grid.Column>
                                                                                    <Grid.Column>
                                                                                        <Form size='huge'>
                                                                                            <Form.Field>
                                                                                                <label>Name</label>
                                                                                                <input value={sustenance.name} />
                                                                                            </Form.Field>
                                                                                            <Form.Field>
                                                                                                <label>Price</label>
                                                                                                <Input placeholder={sustenance.price} labelPosition='right'>
                                                                                                    <input id='sustenance-price' />
                                                                                                    <Label>VND</Label>
                                                                                                </Input>
                                                                                            </Form.Field>
                                                                                            <Form.Field>
                                                                                                <label>Discount</label>
                                                                                                <Input placeholder={sustenance.discount} labelPosition='right'>
                                                                                                    <input id='sustenance-discount' />
                                                                                                    <Label>%</Label>
                                                                                                </Input>
                                                                                            </Form.Field>
                                                                                            <Button onClick={() => this.handleEditSustenance(sustenance.id)} color='green' size='big'>Save</Button>
                                                                                            {
                                                                                                this.state.sustenanceImage ?
                                                                                                    (<Button onClick={() => this.handleUploadImage()} icon color='blue' size='big' labelPosition='right'>
                                                                                                        <Icon name='cloud upload' />
                                                                                                        Upload sustenance image
                                                                                                </Button>) :
                                                                                                    (<Button onClick={() => this.handleSelectImage()} icon color='blue' size='big' labelPosition='right'>
                                                                                                        <Icon name='image' />
                                                                                                        Choose image
                                                                                                 </Button>)
                                                                                            }
                                                                                        </Form>
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                            </Grid>
                                                                        </Segment>
                                                                    </Transition>
                                                                </Accordion.Content>
                                                            </Accordion.Content>
                                                        )
                                                    })
                                                } */}
                                            </div>
                                        )
                                    })
                                }
                            </Accordion>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

        )
    }

    handleSwitchAccordion(index) {
        this.setState({
            activeAccordion: index
        })
    }

    componentWillMount() {
        let urlOrders = constants.service.domain + constants.service.order.name + constants.service.order.all

        fetch(urlOrders).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                orders: json
            })
        })
    }
}