import React from 'react'
import { Modal, Header, Icon, Image, Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Container, Divider, Grid, Input, Accordion } from 'semantic-ui-react'
import { Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import coffeImg from '../images/coffee.jpg'
import constant from '../constants'

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
                    <AllOrder />
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
                    <Pie fill={'#8884d8'} data={this.data} innerRadius='70%' nameKey='name' dataKey='value'>
                        <Cell stroke={'#8884d8'} />
                    </Pie>
                    <Pie fill={'mediumaquamarine'} outerRadius='60%' data={this.data} nameKey='name' dataKey='value'>
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
            orderId: undefined,
            types: [],
            typeIdToFilter: -1
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
                                                <Label style={this.state.typeIdToFilter==type.id?{color: 'white', backgroundColor: 'red'}:null} onClick={() => this.handleFilter(type.id)} as='a' tag>{type.type}</Label>
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

    componentDidMount() {
        let comp = this
        let urlAllSustenance = constant.service.domain + constant.service.catalog.name + constant.service.catalog.all
        fetch(urlAllSustenance).then(res => {
            return res.json()
        }).then(json => {
            json = json.map(d => {
                d.showOnFilter = true
                return d
            })
            comp.setState({ data: json })
        })
        let urlAllTypes = constant.service.domain + constant.service.type.name + constant.service.type.all
        fetch(urlAllTypes).then(res => {
            return res.json()
        }).then(json => {
            this.setState({ types: json })
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
        // this.createEmptyOrder()
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

class AllOrder extends React.Component {
    constructor(props){
        super(props)

        this.state={
            activeIndex: 0
        }
    }

    render(){
        return(
            <Accordion style={{ width: '70%', marginLeft: '1.5%', float: 'left' }}>
                <Accordion.Title active={this.state.activeIndex==0} index={0} onClick={() => this.setState({activeIndex: 0})} >
                    <Segment>
                        aaa
                    </Segment>
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex==0} >
                    <Transition visible={this.state.activeIndex==0} animation='scale' duration={{hide: 1, show: 400}} >
                        <Segment >
                            bbb
                        </Segment>
                    </Transition>
                </Accordion.Content>
                <Accordion.Title active={this.state.activeIndex==1} index={1} onClick={() => this.setState({activeIndex: 1})} >
                    ccc
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex==1} >
                    ddd
                </Accordion.Content>
            </Accordion>
        )
    }
}