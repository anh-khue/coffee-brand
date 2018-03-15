import React from 'react'
import {Modal, Header, Icon, Image ,Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Container, Divider, Grid} from 'semantic-ui-react'
import {Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis, ResponsiveContainer} from 'recharts'
import coffeImg from '../images/coffee.jpg'

export default class TabRenderer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        switch(this.props.info.active){
            case 0:
                return(
                    <Overview data={this.props.info.data}/>
                )
            break;

            case 1:
                return(
                    null
                )
            break;

            case 2:
                return <NewOrder handleCloseModal={this.props.info.handleCloseModal} offsetWidth={this.props.info.offsetWidth}
                sideBarVisible={this.props.info.sideBarVisible}/>
            break;
        }
    }
}

class Overview extends React.Component{
    constructor(props){
        super(props)

        this.colors = ['#E9C46A', '#E76F51', '#59F8E8', '#941C2F', '#03191E', '#1EFC1E', '#2A9D8F']
    }

    render(){
        return(
            <ResponsiveContainer width={500} height={500}>
                <PieChart style={{marginLeft: '50%', transform: 'translateX(50%)'}}>
                    <Pie data={this.props.data} innerRadius='50%' nameKey='name' dataKey='value' >
                    {
          	            this.props.data.map((entry, index) => <Cell fill={this.colors[index % this.colors.length]}/>)
                    }
                    </Pie>
                    <text x='50%' y='60%' textAnchor='middle' fontSize='140'>7</text>
                </PieChart>
            </ResponsiveContainer>
        )
    }

}

class NewOrder extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            open: true,
            customerName: '',
            animate: this.props.sideBarVisible,
            columns: this.props.sideBarVisible? 3:4
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
                "imageId": null,
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
                "imageId": null,
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
                "imageId": null,
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
                "imageId": null,
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
                "imageId": null,
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


        this.stickyRef
    }

    render(){
        if(this.state.open){
            return(
                <Modal open={this.state.open} closeOnDimmerClick={false} closeOnDocumentClick={false} closeIcon onClose={() => this.close()}>
                    <Header as='h2'>
                        <Icon size='small' name='wordpress forms'/>
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
        }else{
            let processedData = []
            this.data.reduce((acc, current, i) => {
                acc.push(current)
                if(acc.length%(this.state.columns)==0){
                    processedData.push(acc)
                    acc = []
                }else if((i+1) == this.data.length){
                    processedData.push(acc)
                }
                return acc
            }, [])
            return(
                <div >
                    <Segment id='list-drink' style={{width: '50%', height: (window.innerHeight - (window.innerHeight/6)), float: 'left', marginLeft: '1.5%',
                        overflowY: 'scroll'}} >
                        <Grid>
                            {
                                processedData.map(rowData => {
                                    return(
                                        <Grid.Row columns={this.state.columns}>
                                            {
                                                rowData.map(data => {
                                                    return(
                                                        <Grid.Column>
                                                            {/* <Transition transitionOnMount visible={this.state.animate} onHide={() => this.onHideCardAnimation()} animation='pulse' duration={300}> */}
                                                                    <Card>
                                                                        <Image src={coffeImg} />
                                                                        <Card.Content>
                                                                            <Card.Header>
                                                                                {data.name}
                                                                            </Card.Header>
                                                                            <Card.Meta>
                                                                                    <span className="date">
                                                                                        {data.typeByTypeId.type}
                                                                                    </span>
                                                                            </Card.Meta>
                                                                        </Card.Content>
                                                                        <Card.Content extra>
                                                                            <Icon name='money'/>
                                                                            {data.price}
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
                    onHide={() => this.onHideBillAnimation()} animation='fly left' duration={this.props.sideBarVisible?1000:10}>
                        <Sticky context={this.stickyRef} id='bill' style={{marginRight: this.props.offsetWidth, marginTop: window.innerHeight/12}}>
                            <Segment raised style={{height: (window.innerHeight - (window.innerHeight/6))}} compact floated='right'>
                                <Label ribbon='right' content='COBRA Customer Bill' color='red' size='huge' />
                                <Segment basic>
                                    <Card>
                                        <Card.Content textAlign='center'>
                                            <Card.Header>
                                                Bill No.123
                                            </Card.Header>
                                            <Card.Meta>
                                                    <span className="date">COBRA</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>
                                </Segment>
                                <Divider style={{backgroundColor: 'lightgrey'}} />
                                <div style={{overflowY: 'scroll', height: '70%'}}>
                                    <Segment basic>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content textAlign='center'>
                                                <Card.Header>
                                                    Bill No.123
                                                </Card.Header>
                                                <Card.Meta>
                                                        <span className="date">COBRA</span>
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                    </Segment>
                                </div>
                            </Segment>
                        </Sticky>
                    </Transition>
                </div>
            )
        }
    }

    onHideCardAnimation(){
        this.setState({
            animate: !this.state.animate
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            animate: !this.state.animate,
            columns: nextProps.sideBarVisible?3:4
        })
        let segmentListDrink = document.getElementById('list-drink')
        segmentListDrink.style.width = nextProps.sideBarVisible? '50%':'73%'
    }

    onCompleteBillAnimation(){
        if(this.props.sideBarVisible){
            document.getElementById('bill').style.marginRight = this.props.offsetWidth + 'px'
        }
    }

    onHideBillAnimation(){
        if(!this.props.sideBarVisible){
            document.getElementById('bill').style.marginRight = '0px'
            document.getElementById('bill').style.visibility = 'visible'
            document.getElementById('bill').style.display = 'block'
        }
    }

    handleSubmitForm(){
        let customerName = this.state.customerName
        //this segment sends the customer name to server to validate
        // assume it's valid
        let response = true

        // => go to drinks menu
        this.setState({
            open: false
        })

    }

    handleChange(e){
        this.setState({
            customerName: e.target.value
        })
    }

    close(){
        this.props.handleCloseModal()
    }
}