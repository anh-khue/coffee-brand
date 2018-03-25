import React from 'react'
import { Modal, Header, Icon, Image, Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Divider, Grid, Input, Statistic, Accordion, Table, Pagination, Rating, Dropdown, Checkbox, Popup, Tab } from 'semantic-ui-react'
import { LineChart, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import coffeImg from '../images/coffee.jpg'
import constants from '../constants';
import GridRow from 'semantic-ui-react/dist/commonjs/collections/Grid/GridRow';

export default class TabRenderer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        switch (this.props.info.active) {
            case 0:
                return (
                    <ManageItems />
                )
                break;
            case 1:
                return (
                    <ManageTables />
                )
                break;
            case 2:
                return (
                    <ManageOrders />
                )
                break;
        }
    }
}

class ManageItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeAccordion: -1,
            activeSubAccordion: -1,
            activePage: 1,
            editingItemSeqId: -1,
            items: [],
            categories: [],
            editingItem: {
                seqId: -1,
                itemId: '',
                itemName: '',
                price: 0,
                categoryByCategorySeqId: {
                    seqId: -1,
                    categoryId: '',
                    description: 'None'
                },
                available: false
            }
        }

        this.maxRecordPerPage = 3
    }

    render() {
        let items = this.state.items
        let categories = this.state.categories
        return (
            <div style={{ overflowY: 'scroll', height: '100%' }}>
                <Grid style={{ width: '75%', marginLeft: '1.5%', marginTop: '1.5%' }}>
                    <Grid.Row columns='equal'>
                        <Grid.Column width={16}>
                            <Segment>
                                <Grid>
                                    <Grid.Row columns={3}>
                                        <Grid.Column>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' textAlign='center'>
                                            <Header>
                                                <Header.Content>
                                                    Item List
                                        </Header.Content>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign='right'>
                                            <Button icon onClick={() => {
                                                this.fetchAllItems()
                                                this.fetchAllCategories()
                                            }}>
                                                <Icon name='refresh' />
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            {
                                this.state.items.length > 0 ?
                                    (<Accordion>
                                        {
                                            categories.map((category, categoryIndex) => {
                                                let itemsInThisCategory = items.filter(i => i.categoryByCategorySeqId.categoryId == category.categoryId)
                                                let itemsInThisCategoryPaged = []
                                                let pages = Math.ceil(itemsInThisCategory.length / this.maxRecordPerPage)
                                                let categoryOptions = categories.map(category => {
                                                    return {
                                                        text: category.categoryId,
                                                        value: category.seqId
                                                    }
                                                })
                                                itemsInThisCategory.reduce((acc, current, i) => {
                                                    acc.push(current)
                                                    if (acc.length % (this.maxRecordPerPage) == 0) {
                                                        itemsInThisCategoryPaged.push(acc)
                                                        acc = []
                                                    } else if ((i + 1) == itemsInThisCategory.length) {
                                                        itemsInThisCategoryPaged.push(acc)
                                                    }
                                                    return acc
                                                }, [])
                                                return (
                                                    <div>
                                                        <Accordion.Title active={this.state.activeAccordion == categoryIndex} index={categoryIndex} onClick={() => this.handleClickAccordion(categoryIndex)}>
                                                            <Segment style={{ borderBottom: this.state.activeAccordion == categoryIndex ? '2px solid red' : '', zIndex: '-1' }}>
                                                                <Grid>
                                                                    <Grid.Row columns={2}>
                                                                        <Grid.Column verticalAlign='middle'>
                                                                            <Header size='huge'>
                                                                                <Icon name='food' />
                                                                                <Header.Content>
                                                                                    {category.categoryId}
                                                                                </Header.Content>
                                                                            </Header>
                                                                        </Grid.Column>
                                                                        <Grid.Column textAlign='right'>
                                                                            <Statistic>
                                                                                <Statistic.Value>
                                                                                    {itemsInThisCategory.length}
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
                                                        <Accordion.Content style={{ width: '95%', marginLeft: '100%', transform: 'translateX(-100%)', padding: '0' }} active={this.state.activeAccordion == categoryIndex}>
                                                            <Transition animation='scale' visible={this.state.activeAccordion == categoryIndex} duration={{ hide: 1, show: 250 }}>
                                                                <Segment>
                                                                    <Table celled>
                                                                        <Table.Header>
                                                                            <Table.Row textAlign='center'>
                                                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                                                <Table.HeaderCell>Price</Table.HeaderCell>
                                                                                <Table.HeaderCell>Category</Table.HeaderCell>
                                                                                <Table.HeaderCell>Available</Table.HeaderCell>
                                                                                <Table.HeaderCell>Action</Table.HeaderCell>
                                                                            </Table.Row>
                                                                        </Table.Header>
                                                                        {
                                                                            (itemsInThisCategoryPaged.length == 0 || itemsInThisCategoryPaged[(this.state.activePage - 1)] == undefined) ?
                                                                                null :
                                                                                (
                                                                                    <Table.Body>
                                                                                        {
                                                                                            itemsInThisCategoryPaged[(this.state.activePage - 1)].map(item => {
                                                                                                let category = categories.find(c => c.categoryId == item.categoryByCategorySeqId.categoryId)
                                                                                                return (
                                                                                                    <Table.Row>
                                                                                                        <Table.Cell>
                                                                                                            <Header>
                                                                                                                <Icon name='food' />
                                                                                                                <Header.Content>
                                                                                                                    {
                                                                                                                        (<Input disabled value={item.itemId} />)
                                                                                                                    }
                                                                                                                </Header.Content>
                                                                                                            </Header>
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingItemSeqId != item.seqId) ?
                                                                                                                    (<Header size='small'>
                                                                                                                        <Header.Content>
                                                                                                                            {item.itemName}
                                                                                                                        </Header.Content>
                                                                                                                    </Header>)
                                                                                                                    : (<Input onChange={(e) => this.handleEditChanges('itemName', e.target.value)} placeholder={item.itemName} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingItemSeqId != item.seqId) ?
                                                                                                                    (<Header>
                                                                                                                        <Header.Content>
                                                                                                                            {item.price}
                                                                                                                        </Header.Content>
                                                                                                                    </Header>)
                                                                                                                    : (<Input onChange={(e) => this.handleEditChanges('price', e.target.value)} placeholder={item.price} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingItemSeqId != item.seqId) ?
                                                                                                                    (<Header>
                                                                                                                        <Header.Content>
                                                                                                                            {category.categoryId}
                                                                                                                        </Header.Content>
                                                                                                                    </Header>)
                                                                                                                    : (<Dropdown onChange={(e, data) => this.handleEditChanges('categoryByCategorySeqId',
                                                                                                                        { seqId: data.value, categoryId: this.state.categories.find(c => c.seqId == data.value).categoryId, description: this.state.categories.find(c => c.seqId == data.value).description })}
                                                                                                                        defaultValue={(categoryOptions.findIndex(b => b.text == category.categoryId) + 1)} options={categoryOptions} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell textAlign='center'>
                                                                                                            {
                                                                                                                (this.state.editingItemSeqId != item.seqId) ?
                                                                                                                    (<Checkbox toggle checked={item.available} />)
                                                                                                                    : (<Checkbox onChange={(e, data) => this.handleEditChanges('available', data.checked)} toggle defaultChecked={true} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell textAlign='center'>
                                                                                                            <Popup position='top right' flowing hoverable trigger={<Button compact icon={<Icon size='large' name='pencil' />} />}>
                                                                                                                <Button.Group>
                                                                                                                    <Button color={this.state.editingItemSeqId == item.seqId ? 'green' : null} compact
                                                                                                                        onClick={() => this.handleEdit(item.seqId)}
                                                                                                                    >
                                                                                                                        {
                                                                                                                            this.state.editingItemSeqId == item.seqId ?
                                                                                                                                'Save' : 'Edit'
                                                                                                                        }
                                                                                                                    </Button>
                                                                                                                    {
                                                                                                                        this.state.editingItemSeqId == item.seqId ?
                                                                                                                            (<Button compact color='red'
                                                                                                                                onClick={() => this.handleEdit(-1)}
                                                                                                                            >
                                                                                                                                Cancel
                                                                                                    </Button>) : null
                                                                                                                    }
                                                                                                                </Button.Group>
                                                                                                            </Popup>

                                                                                                        </Table.Cell>
                                                                                                    </Table.Row>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </Table.Body>
                                                                                )
                                                                        }
                                                                        <Table.Footer>
                                                                            <Table.Row textAlign='center'>
                                                                                <Table.HeaderCell colSpan={5}>
                                                                                    <Pagination onPageChange={(e, data) => this.handleChangePage(data.activePage)} activePage={this.state.activePage} defaultActivePage={1} totalPages={pages} />
                                                                                </Table.HeaderCell>
                                                                                <Table.HeaderCell colSpan={5}>
                                                                                    <Button color='blue'>
                                                                                        Add new
                                                                        </Button>
                                                                                </Table.HeaderCell>
                                                                            </Table.Row>
                                                                        </Table.Footer>
                                                                    </Table>
                                                                </Segment>
                                                            </Transition>
                                                        </Accordion.Content>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Accordion>)
                                    :
                                    (null)
                            }
                        </Grid.Column>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>
        )
    }

    updateItemServer(updatedItem) {
        let urlUpdate = constants.domain + constants.editItemById

        fetch(urlUpdate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            },
            body: JSON.stringify(updatedItem)
        }).then(res => {
            if (res.status == 200) {
                this.fetchAllItems()
            }
        })
    }

    handleEditChanges(field, value) {
        this.setState(prevState => {
            return {
                editingItem: Object.assign(prevState.editingItem, { [field]: value })
            }
        })
    }

    handleEdit(editingItemSeqId) {
        let editSeqId = editingItemSeqId
        let items = this.state.items
        let categories = this.state.categories
        let editingItem = this.state.editingItem
        let categoryToAdd = categories.find(category => category.categoryId == editingItem.itemCategory)

        if (this.state.editingItemSeqId == editSeqId) {
            let oldItem = items.find(i => i.seqId == editSeqId)
            Object.assign(oldItem, editingItem)
            this.updateItemServer(editingItem)
        } else if (this.state.editingItemSeqId == -1 && editSeqId != -1) {
            editingItem = Object.assign(editingItem, items.find(i => i.seqId == editSeqId))
        } else {
            editingItem = {
                seqId: -1,
                itemId: '',
                itemName: '',
                price: 0,
                categoryByCategorySeqId: {
                    seqId: -1,
                    categoryId: '',
                    description: 'None'
                },
                available: false
            }
            editSeqId = -1
        }
        this.setState({
            editingItemSeqId: editSeqId,
            editingItem: editingItem
        })
    }

    handleChangePage(page) {
        this.setState({
            activePage: page
        })
    }

    handleClickAccordion(index) {
        this.setState(prevState => {
            return {
                activeAccordion: prevState.activeAccordion == index ? -1 : index,
                activeSubAccordion: -1,
                editingItemSeqId: -1
            }
        })
    }

    handleClickSubAccordion(index) {
        this.setState(prevState => {
            return {
                activeSubAccordion: prevState.activeSubAccordion == index ? -1 : index,
                editingItemSeqId: -1
            }
        })
    }

    componentDidMount() {
        this.fetchAllItems()
        this.fetchAllCategories()
    }

    fetchAllCategories() {
        let urlAllCategories = constants.domain + constants.getAllCategories

        fetch(urlAllCategories, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                categories: json
            })
        })
    }

    fetchAllItems() {
        let urlAllItems = constants.domain + constants.getAllItems

        fetch(urlAllItems, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                items: json
            })
        })
    }
}

class ManageOrders extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            allOrders: [],
            payRequestOrders: [],
            orderDetails: [],
            checkedOutDetails: [],
            receiptSeqId: -1
        }

        this.maxRecordPerRow = 4

        this.panes = [
            {
                menuItem: 'Checkout Receipt', render: () => {
                    let payRequestOrders = this.state.payRequestOrders
                    let orderDetails = this.state.orderDetails
                    let checkedOutDetails = this.state.checkedOutDetails
                    return (
                        <Tab.Pane style={{ backgroundColor: '#e1e4ea', border: 'transparent' }}>
                            <Grid>
                                <Grid.Row columns={3}>
                                    <Grid.Column width={4}>
                                        <Segment>
                                            <Header icon textAlign='center'>
                                                <Icon size='large' name='remove' />
                                                Waiting Queue
                                </Header>
                                            <Divider />
                                            <div style={{ height: '100%' }}>
                                                <Segment basic style={{ height: window.innerHeight - (window.innerHeight * 35 / 100), overflowY: 'scroll' }}>
                                                    {
                                                        payRequestOrders.length <= 0 ?
                                                            null :
                                                            payRequestOrders.map(order => {
                                                                return (
                                                                    <Card onClick={() => this.getReceiptDetailsByReceiptSeqId(order.seqId)}>
                                                                        <Card.Content>
                                                                            <Grid>
                                                                                <Grid.Row columns={'equal'}>
                                                                                    <Grid.Column stretched textAlign='center'>
                                                                                        <Header>
                                                                                            <Header.Content>
                                                                                                Receipt {order.seqId}
                                                                                            </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                                <Grid.Row columns={2}>
                                                                                    <Grid.Column>
                                                                                        <Header>
                                                                                            <Header.Content>
                                                                                                Table
                                                                                </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                    <Grid.Column textAlign='right'>
                                                                                        <Header>
                                                                                            <Header.Content>
                                                                                                {order.dinerTableByTableSeqId.tableId}
                                                                                            </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                                <Grid.Row columns={2}>
                                                                                    <Grid.Column>
                                                                                        <Header>
                                                                                            <Header.Content>
                                                                                                Total
                                                                                </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                    <Grid.Column textAlign='right'>
                                                                                        <Header>
                                                                                            <Header.Content>
                                                                                                {order.total}
                                                                                            </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                            </Grid>
                                                                        </Card.Content>
                                                                    </Card>
                                                                )
                                                            })
                                                    }
                                                </Segment>
                                            </div>
                                        </Segment>
                                    </Grid.Column>

                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Grid>
                                                <Grid.Row columns={3}>
                                                    <Grid.Column verticalAlign='middle' textAlign='left'>
                                                        <Button size='huge' onClick={() => this.setState({ orderDetails: [] })}>
                                                            Clear
                                            </Button>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Header icon textAlign='center'>
                                                            <Icon name='search' />
                                                            Order Detail
                                            </Header>
                                                    </Grid.Column>
                                                    <Grid.Column verticalAlign='middle' textAlign='right'>
                                                        <Button size='huge' color='blue' disabled={this.state.receiptSeqId == -1} onClick={() => this.checkoutOrder(this.state.receiptSeqId)}>
                                                            Checkout
                                            </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            <Divider />
                                            <Segment basic style={{ height: window.innerHeight - (window.innerHeight * 35 / 100), overflowY: 'scroll' }}>
                                                {
                                                    orderDetails.length <= 0 ?
                                                        null :
                                                        orderDetails.map(orderDetail => {
                                                            return (
                                                                <Segment>
                                                                    <Grid>
                                                                        <Grid.Row columns={5}>
                                                                            <Grid.Column>
                                                                                {orderDetail.itemByItemSeqId.itemId}
                                                                            </Grid.Column>
                                                                            <Grid.Column>
                                                                                {orderDetail.itemByItemSeqId.itemName}
                                                                            </Grid.Column>
                                                                            <Grid.Column>
                                                                                {orderDetail.quantity}
                                                                            </Grid.Column>
                                                                            <Grid.Column>
                                                                                {orderDetail.itemByItemSeqId.price}
                                                                            </Grid.Column>
                                                                            <Grid.Column>
                                                                                {orderDetail.itemByItemSeqId.categoryByCategorySeqId.categoryId}
                                                                            </Grid.Column>
                                                                        </Grid.Row>
                                                                    </Grid>
                                                                </Segment>
                                                            )
                                                        })
                                                }
                                            </Segment>
                                        </Segment>
                                    </Grid.Column>

                                    <Grid.Column width={4}>
                                        <Segment>
                                            <Header icon textAlign='center'>
                                                <Icon name='checkmark' />
                                                Paid
                                </Header>
                                            <Divider />
                                            <Segment basic style={{ height: window.innerHeight - (window.innerHeight * 35 / 100), overflowY: 'scroll' }}>
                                                {
                                                    checkedOutDetails.length <= 0 ?
                                                        null :
                                                        checkedOutDetails.map(order => {
                                                            return (
                                                                <Card onClick={() => this.getReceiptDetailsByReceiptSeqId(order.seqId)}>
                                                                    <Card.Content>
                                                                        <Grid>
                                                                            <Grid.Row columns={'equal'}>
                                                                                <Grid.Column stretched textAlign='center'>
                                                                                    <Header>
                                                                                        <Header.Content>
                                                                                            Receipt {order.seqId}
                                                                                        </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                            </Grid.Row>
                                                                            <Grid.Row columns={2}>
                                                                                <Grid.Column>
                                                                                    <Header>
                                                                                        <Header.Content>
                                                                                            Table
                                                                                </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                                <Grid.Column textAlign='right'>
                                                                                    <Header>
                                                                                        <Header.Content>
                                                                                            {order.dinerTableByTableSeqId.tableId}
                                                                                        </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                            </Grid.Row>
                                                                            <Grid.Row columns={2}>
                                                                                <Grid.Column>
                                                                                    <Header>
                                                                                        <Header.Content>
                                                                                            Total
                                                                                </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                                <Grid.Column textAlign='right'>
                                                                                    <Header>
                                                                                        <Header.Content>
                                                                                            {order.total}
                                                                                        </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                            </Grid.Row>
                                                                        </Grid>
                                                                    </Card.Content>
                                                                </Card>
                                                            )
                                                        })
                                                }
                                            </Segment>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Tab.Pane>
                    )
                }
            },
            {
                menuItem: 'All Receipts', render: () => {
                    let processOrders = []
                    this.state.allOrders.reduce((acc, current, i) => {
                        acc.push(current)
                        if (acc.length == this.maxRecordPerRow || (i + 1) == this.state.allOrders.length) {
                            processOrders.push(acc)
                            acc = []
                        }
                        return acc
                    }, [])
                    return (
                        <Tab.Pane style={{ backgroundColor: '#e1e4ea', borderColor: 'transparent' }}>
                            <Grid>
                                {
                                    processOrders.map(orders => {
                                        return (
                                            <Grid.Row columns={this.maxRecordPerRow}>
                                                {
                                                    orders.map(order => {
                                                        return (
                                                            <Grid.Column>
                                                                <Card>
                                                                    <Card.Content>
                                                                        <Card.Header>
                                                                            {order.seqId}
                                                                        </Card.Header>
                                                                    </Card.Content>
                                                                </Card>
                                                            </Grid.Column>
                                                        )
                                                    })
                                                }
                                            </Grid.Row>
                                        )
                                    })
                                }
                            </Grid>
                        </Tab.Pane>
                    )
                }
            }
        ]
    }

    render() {
        return (
            <div style={{ height: '100%', overflowY: 'scroll' }}>
                <Grid style={{ width: '100%', marginLeft: '1.5%', marginTop: '1.5%' }}>
                    <Tab menu={{ pointing: true, color: 'red', inverted: true }} panes={this.panes} style={{ width: '75%' }} />
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        this.getAllPayRequestOrders()
        this.getAllCheckedOutOrder()
        this.getAllOrders()
    }

    getAllOrders() {
        let urlAllOrders = constants.domain + constants.getAllReceipts

        fetch(urlAllOrders, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                allOrders: json
            })
        })
    }

    getAllPayRequestOrders() {
        let urlPayRequestOrders = constants.domain + constants.getPayRequestOrders

        fetch(urlPayRequestOrders, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                payRequestOrders: json
            })
        })
    }

    checkoutOrder(orderSeqId) {
        let urlCheckout = constants.domain + constants.checkoutOrder
        urlCheckout = urlCheckout.replace('{receiptSeq}', orderSeqId)
        let checkedOutDetails = this.state.checkedOutDetails

        fetch(urlCheckout, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                orderDetails: []
            })
            this.getAllPayRequestOrders()
            this.getAllCheckedOutOrder()
        })
    }

    getAllCheckedOutOrder() {
        let urlAllCheckedOutOrders = constants.domain + constants.getAllCheckedOutOrders

        fetch(urlAllCheckedOutOrders, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                checkedOutDetails: json
            })
        })
    }

    getReceiptDetailsByReceiptSeqId(seqId) {
        let checkedOut = this.state.checkedOutDetails.find(order => order.seqId == seqId)
        let urlReceiptDetails = constants.domain + constants.getReceiptDetailsByReceiptSeqId
        urlReceiptDetails = urlReceiptDetails.replace('{id}', seqId)

        fetch(urlReceiptDetails, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                orderDetails: json,
                receiptSeqId: checkedOut ? -1 : seqId
            })
        })
    }
}

class ManageTables extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tables: [],
            receiptsByTableId: {},
            showTable: -1,
        }

        this.stickyRef

        this.colPerRow = 3
    }

    render() {
        let tables = this.state.tables
        let receiptsByTableId = this.state.receiptsByTableId
        let processedTables = []
        tables.reduce((acc, current, i) => {
            acc.push(current)
            if (acc.length == this.colPerRow || (i + 1) == tables.length) {
                processedTables.push(acc)
                acc = []
            }
            return acc
        }, [])
        return (
            <div style={{ height: '100%', overflowY: 'scroll' }}>
                <Grid style={{ width: '75%', marginLeft: '1.5%', marginTop: '1.5%' }}>
                    <Grid.Row columns='equal'>
                        <Grid.Column width={16}>
                            <Grid.Row>
                                <Segment>
                                    <Grid>
                                        <Grid.Row columns={3}>
                                            <Grid.Column>
                                            </Grid.Column>
                                            <Grid.Column verticalAlign='middle' textAlign='center'>
                                                <Header>
                                                    <Header.Content>
                                                        Table List
                                        </Header.Content>
                                                </Header>
                                            </Grid.Column>
                                            <Grid.Column textAlign='right'>
                                                <Button icon onClick={() => this.getAllTables()}>
                                                    <Icon name='refresh' />
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Row>
                            <Segment ref={e => this.stickyRef = e} style={{ height: window.innerHeight - (window.innerHeight * 22.5 / 100), overflowY: 'scroll' }}>
                                <Grid>
                                    {
                                        processedTables.map(tables => {
                                            return (
                                                <Grid.Row columns={this.colPerRow}>
                                                    {
                                                        tables.map(table => {
                                                            return (
                                                                <Grid.Column>
                                                                    <Transition animation='horizontal flip' duration={{ hide: 1, show: 380 }} visible={this.state.showTable != table.tableId}>
                                                                        <Card onClick={
                                                                            table.statusByStatusSeqId.statusId == 'AVA' ? null :
                                                                                () => this.getReceiptsByTableId(table.tableId)
                                                                        }>
                                                                            <Card.Content>
                                                                                <Label color={table.statusByStatusSeqId.statusId == 'AVA' ? 'green' : 'red'} attached='top' />
                                                                                <Header textAlign='center' icon>
                                                                                    <Icon name='archive' />
                                                                                    Table {table.tableId}
                                                                                </Header>
                                                                                <Card.Header textAlign='center'>
                                                                                    {table.statusByStatusSeqId.statusName}
                                                                                </Card.Header>
                                                                            </Card.Content>
                                                                        </Card>
                                                                    </Transition>
                                                                    {
                                                                        table.statusByStatusSeqId.statusId == 'OCC' ?
                                                                            (
                                                                                <Transition animation='horizontal flip' duration={{ hide: 1, show: 380 }} visible={this.state.showTable == table.tableId}>
                                                                                    <Card onClick={() => this.toggleFlip(-1)}>
                                                                                        <Card.Content>
                                                                                            <Label color={table.statusByStatusSeqId.statusId == 'AVA' ? 'green' : 'red'} attached='top' />
                                                                                            <Header textAlign='center' icon>
                                                                                                <Icon name='checkmark box' />
                                                                                                Receipt {receiptsByTableId.seqId}
                                                                                            </Header>
                                                                                            <Card.Header textAlign='center'>
                                                                                                Total {receiptsByTableId.total}
                                                                                            </Card.Header>
                                                                                        </Card.Content>
                                                                                    </Card>
                                                                                </Transition>
                                                                            ) : null
                                                                    }
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
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }

    toggleFlip(tableId) {
        this.setState({
            showTable: tableId
        })
    }

    getReceiptsByTableId(tableId) {
        let urlReceiptsByTableId = constants.domain + constants.getReceiptByTableId
        urlReceiptsByTableId = urlReceiptsByTableId.replace('{id}', tableId)

        fetch(urlReceiptsByTableId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                receiptsByTableId: json
            })
        })
        this.toggleFlip(tableId)
    }

    componentDidMount() {
        this.getAllTables()
    }

    getAllTables() {
        let urlAllTables = constants.domain + constants.getAllTables

        fetch(urlAllTables, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('JWToken')
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                tables: json
            })
        })
    }
}