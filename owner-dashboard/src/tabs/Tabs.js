import React from 'react'
import { Modal, Header, Icon, Image, Form, Button, Card, Segment, Sticky, Rail, Label, Transition, Divider, Grid, Input, Statistic, Accordion, Table, Pagination, Rating, Dropdown, Checkbox, Popup } from 'semantic-ui-react'
import { LineChart, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import coffeImg from '../images/coffee.jpg'
import constants from '../constants';
import ITEM from '../dataset/item'
import CATEGORY from '../dataset/category'
import GridRow from 'semantic-ui-react/dist/commonjs/collections/Grid/GridRow';

export default class TabRenderer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        switch (this.props.info.active) {
            case 0:
                return (
                    // <Overview data={this.props.info.data} sideBarVisible={this.props.info.sideBarVisible} />
                    null
                )
                break;
            case 1:
                return (
                    <ManageItems />
                )
                break;
            case 2:
                return (
                    null
                )
                break;
            case 3:
                return (
                    <ManageOrders />
                )
                break;
        }
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props)

        this.compName = 'Overview'

        this.state = {
            data: []
        }

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

    // componentWillMount(){
    //     let urlOrderByDate = constants.service.domain+constants.service.order.name+constants.service.order.date
    //     for(let i=5; i>=0; i--){
    //         let d = new Date()
    //         d.setDate(d.getDate() - i)
    //         let date = d.toISOString().substr(0, 10)
    //         let url = urlOrderByDate.replace('{date}', date+' 00:00:00')
    //         fetch(url).then(res => {
    //             return res.json()
    //         }).then(json => {
    //             let total = json.reduce((acc, current, i) => {
    //                 return acc+=current.total
    //             }, 0)
    //             this.setState(prevState => {
    //                 return{
    //                     data: prevState.data.push({date: date, sale: total})
    //                 }
    //             })
    //         })
    //     }
    // }

}

class ManageBranches extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeAccordion: -1,
            activeImageUpload: false,
            branches: [
                // {
                //     id: 1,
                //     name: 'Innovation',
                //     address: 'Innovation Building, Quang Trung Software City, District 12, Ho Chi Minh City',
                //     latitude: 10.852899551391602,
                //     longitude: 106.62899780273438,
                //     openingHour: '07:00:00',
                //     closingHour: '21:00:00',
                //     driveFolderId: null,
                //     rating: 4
                // },
                // {
                //     id: 2,
                //     name: 'Gen Pacific',
                //     address: 'Gen Pacific Building, Quang Trung Software City, District 12, Ho Chi Minh City',
                //     latitude: 10.852499961853027,
                //     longitude: 106.62699890136719,
                //     openingHour: '07:00:00',
                //     closingHour: '21:00:00',
                //     driveFolderId: null,
                //     rating: 4
                // },
                // {
                //     id: 7,
                //     name: 'Anna',
                //     address: 'Anna Building, Quang Trung Software City, District 12, Ho Chi Minh City',
                //     latitude: 10.853992,
                //     longitude: 106.625619,
                //     openingHour: '07:00:00',
                //     closingHour: '22:00:00',
                //     driveFolderId: '1lkIQZV0zovBXjohfKn_cs5if4j_jZuYS',
                //     rating: 3
                // },
                // {
                //     id: 8,
                //     name: 'Moda Nguyen Oanh',
                //     address: '11 Nguyen Oanh, District Go Vap, Ho Chi Minh City',
                //     latitude: 10.827909469604492,
                //     longitude: 106.67930603027344,
                //     openingHour: '06:00:00',
                //     closingHour: '02:30:00',
                //     driveFolderId: null,
                //     rating: 0
                // }
            ],
            employees: [
                // {
                //     id: 1,
                //     accountId: 4,
                //     role: 'MANAGER',
                //     firstName: 'Tuan',
                //     lastName: 'Dao',
                //     dateOfBirth: '1997-03-06T00:40:34.000+0000',
                //     email: 'nhatdao@gmail.com',
                //     phone: '0123456789',
                //     branchId: 1
                // },
                // {
                //     id: 2,
                //     accountId: 2,
                //     role: 'CASHIER',
                //     firstName: 'Nhat',
                //     lastName: 'Nguyen Quang',
                //     dateOfBirth: '1990-03-19T00:40:34.000+0000',
                //     email: 'nhatnguyenquang@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // },
                // {
                //     id: 3,
                //     accountId: 5,
                //     role: 'WAITER/WAITRESS',
                //     firstName: 'Cuong',
                //     lastName: 'Mai Vu',
                //     dateOfBirth: '1997-11-24T00:40:34.000+0000',
                //     email: 'cuongmai@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // },
                // {
                //     id: 4,
                //     accountId: 5,
                //     role: 'WAITER/WAITRESS',
                //     firstName: 'a',
                //     lastName: 'Mai Vu',
                //     dateOfBirth: '1997-11-24T00:40:34.000+0000',
                //     email: 'cuongmai@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // },
                // {
                //     id: 5,
                //     accountId: 5,
                //     role: 'WAITER/WAITRESS',
                //     firstName: 'b',
                //     lastName: 'Mai Vu',
                //     dateOfBirth: '1997-11-24T00:40:34.000+0000',
                //     email: 'cuongmai@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // },
                // {
                //     id: 6,
                //     accountId: 5,
                //     role: 'WAITER/WAITRESS',
                //     firstName: 'c',
                //     lastName: 'Mai Vu',
                //     dateOfBirth: '1997-11-24T00:40:34.000+0000',
                //     email: 'cuongmai@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // },
                // {
                //     id: 7,
                //     accountId: 5,
                //     role: 'WAITER/WAITRESS',
                //     firstName: 'd',
                //     lastName: 'Mai Vu',
                //     dateOfBirth: '1997-11-24T00:40:34.000+0000',
                //     email: 'cuongmai@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // },
                // {
                //     id: 8,
                //     accountId: 5,
                //     role: 'WAITER/WAITRESS',
                //     firstName: 'e',
                //     lastName: 'Mai Vu',
                //     dateOfBirth: '1997-11-24T00:40:34.000+0000',
                //     email: 'cuongmai@gmail.com',
                //     phone: '9876543210',
                //     branchId: 2
                // }
            ],
            editingEmpId: -1,
            activePage: 1,
            branchImage: '',
            uploadImageSucceed: false
        }

        this.tmpEmp = {
            id: 0,
            accountId: 0,
            role: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            email: '',
            phone: '',
            branchId: 0
        }

        this.maxRecordPerPage = 3

    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '70%' : '95%'
        let branchOptions = this.state.branches.map(b => {
            return {
                text: b.name,
                value: b.id
            }
        })
        return (
            <div style={{ overflowY: 'scroll', height: '100%' }}>
                <Accordion style={{ width: responsiveWidth, marginLeft: '1.5%', marginTop: '1.5%' }} >
                    {
                        this.state.branches.map((branch, index) => {
                            let employeesInThisBranch = this.state.employees.filter(e => e.branchId == branch.id)
                            let employeesInThisBranchPaged = []
                            let pages = Math.ceil(employeesInThisBranch.length / 3)
                            employeesInThisBranch.reduce((acc, current, i) => {
                                acc.push(current)
                                if (acc.length % (this.maxRecordPerPage) == 0) {
                                    employeesInThisBranchPaged.push(acc)
                                    acc = []
                                } else if ((i + 1) == employeesInThisBranch.length) {
                                    employeesInThisBranchPaged.push(acc)
                                }
                                return acc
                            }, [])
                            return (
                                <div>
                                    <Accordion.Title active={this.state.activeAccordion == index} index={index} onClick={() => this.handleSwitchAccordion(index)}>
                                        <Segment style={{ borderBottom: this.state.activeAccordion == index ? '2px solid blue' : '' }} raised={this.state.activeAccordion == index} >
                                            <Grid>
                                                <Grid.Row verticalAlign='middle' columns={'equal'}>
                                                    <Grid.Column width={9}>
                                                        <Header size='large' >
                                                            <Icon name='marker' size='big' />
                                                            <Header.Content>
                                                                {branch.name}
                                                                <Header.Subheader>
                                                                    {branch.address}
                                                                </Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Statistic floated='right'>
                                                            <Statistic.Value>
                                                                <Rating disabled maxRating={5} defaultRating={branch.rating} icon='star' size='huge' />
                                                            </Statistic.Value>
                                                            <Statistic.Label>
                                                                {
                                                                    (Math.round(branch.rating * 2) / 2).toFixed(1)
                                                                }
                                                            </Statistic.Label>
                                                        </Statistic>
                                                    </Grid.Column>
                                                    {/* <Grid.Column>
                                                    <Header floated='right' size='large'>
                                                        <Icon name='info circle' />
                                                        <Header.Content>
                                                            Dao Tuan
                                            <Header.Subheader>
                                                                Branch Manager
                                            </Header.Subheader>
                                                        </Header.Content>
                                                    </Header>
                                                </Grid.Column> */}
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>
                                    </Accordion.Title>

                                    <Accordion.Content style={{ width: '95%', marginLeft: '100%', transform: 'translateX(-100%)' }} active={this.state.activeAccordion == index}>
                                        <Transition animation='scale' visible={this.state.activeAccordion == index} duration={{ hide: 1, show: 350 }} >
                                            <Segment>
                                                <Grid>
                                                    <Grid.Row style={{ paddingBottom: '0%' }}>
                                                        <Grid.Column textAlign='center'>
                                                            <Button color='blue' labelPosition='left' icon onClick={() => this.handleSwitchSegment()}>
                                                                <Icon size='large' name={this.state.activeImageUpload ? 'users' : 'image'} />
                                                                {
                                                                    this.state.activeImageUpload ? 'Employee list' : 'Upload branch image'
                                                                }
                                                                <input type='file' id='imgUpload' onChange={() => this.handleLoadImage()} style={{ display: 'none', visibility: 'hidden' }} />
                                                            </Button>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            {
                                                                this.state.activeImageUpload ?
                                                                    (
                                                                        <Segment>
                                                                            <Grid>
                                                                                <Grid.Row>
                                                                                    <Grid.Column textAlign='center'>
                                                                                        {
                                                                                            this.state.uploadImageSucceed ?
                                                                                                (
                                                                                                    <Icon size='massive' name='checkmark' />
                                                                                                )
                                                                                                : (<Image src={this.state.branchImage.url} />)
                                                                                        }
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                                <Grid.Row>
                                                                                    <Grid.Column textAlign='center'>
                                                                                        <Button onClick={() => this.handleUploadImage(branch.id)} color='grey' icon labelPosition='left'>
                                                                                            <Icon size='large' name='cloud upload' />
                                                                                            Upload to cloud
                                                                                        </Button>
                                                                                    </Grid.Column>
                                                                                </Grid.Row>
                                                                            </Grid>
                                                                        </Segment>
                                                                    )
                                                                    : (<Table celled>
                                                                        <Table.Header>
                                                                            <Table.Row textAlign='center'>
                                                                                <Table.HeaderCell>Employee</Table.HeaderCell>
                                                                                <Table.HeaderCell>DOB</Table.HeaderCell>
                                                                                <Table.HeaderCell>Email</Table.HeaderCell>
                                                                                <Table.HeaderCell>Phone</Table.HeaderCell>
                                                                                <Table.HeaderCell>Branch</Table.HeaderCell>
                                                                                <Table.HeaderCell>Action</Table.HeaderCell>
                                                                            </Table.Row>
                                                                        </Table.Header>
                                                                        {
                                                                            (employeesInThisBranchPaged.length == 0 || employeesInThisBranchPaged[(this.state.activePage - 1)] == undefined) ?
                                                                                null :
                                                                                (
                                                                                    <Table.Body>
                                                                                        {
                                                                                            employeesInThisBranchPaged[(this.state.activePage - 1)].map(emp => {
                                                                                                return (
                                                                                                    <Table.Row>
                                                                                                        <Table.Cell>
                                                                                                            <Header>
                                                                                                                <Icon name='user' />
                                                                                                                <Header.Content>
                                                                                                                    {
                                                                                                                        (this.state.editingEmpId != emp.id) ?
                                                                                                                            (emp.lastName + ' ' + emp.firstName)
                                                                                                                            : (<Input id='empName' size='tiny' placeholder={emp.lastName + ' ' + emp.firstName} />)
                                                                                                                    }
                                                                                                                    <Header.Subheader>
                                                                                                                        {
                                                                                                                            (emp.role)
                                                                                                                        }
                                                                                                                    </Header.Subheader>
                                                                                                                </Header.Content>
                                                                                                            </Header>
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingEmpId != emp.id) ?
                                                                                                                    (new Date(emp.dateOfBirth)).toLocaleDateString('vi-VN')
                                                                                                                    : (<Input id='empDOB' type='date' size='tiny' placeholder={(new Date(emp.dateOfBirth)).toLocaleDateString('vi-VN')} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingEmpId != emp.id) ?
                                                                                                                    (emp.email)
                                                                                                                    : (<Input id='empEmail' type='email' size='tiny' placeholder={emp.email} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingEmpId != emp.id) ?
                                                                                                                    (emp.phone)
                                                                                                                    : (<Input id='empPhone' size='tiny' placeholder={emp.phone} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell>
                                                                                                            {
                                                                                                                (this.state.editingEmpId != emp.id) ?
                                                                                                                    (branch.name)
                                                                                                                    : (<Dropdown id='empBranch' defaultValue={(branchOptions.findIndex(b => b.value == branch.id) + 1)} options={branchOptions} />)
                                                                                                            }
                                                                                                        </Table.Cell>
                                                                                                        <Table.Cell textAlign='center'>
                                                                                                            <Button color={this.state.editingEmpId == emp.id ? 'green' : null} compact
                                                                                                                icon={this.state.editingEmpId != emp.id ? <Icon size='large' name='pencil' /> : null}
                                                                                                                onClick={() => this.handleEdit(emp.id)
                                                                                                                }
                                                                                                            >
                                                                                                                {
                                                                                                                    this.state.editingEmpId == emp.id ?
                                                                                                                        'Save' : null
                                                                                                                }
                                                                                                            </Button>
                                                                                                            {
                                                                                                                this.state.editingEmpId == emp.id ?
                                                                                                                    (<Button compact color='red'
                                                                                                                        onClick={() => this.handleEdit(-1)}
                                                                                                                    >
                                                                                                                        Cancel
                                                                                                    </Button>) : null
                                                                                                            }
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
                                                                                <Table.HeaderCell colSpan={6}>
                                                                                    <Pagination onPageChange={(e, data) => this.handleChangePage(data.activePage)} activePage={this.state.activePage} defaultActivePage={1} totalPages={pages} />
                                                                                </Table.HeaderCell>
                                                                            </Table.Row>
                                                                        </Table.Footer>
                                                                    </Table>)
                                                            }
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Segment>
                                        </Transition>
                                    </Accordion.Content>
                                </div>
                            )
                        })
                    }
                </Accordion>
            </div>
        )
    }

    componentWillMount() {
        let urlBranches = constants.service.domain + constants.service.branch.name + constants.service.branch.all
        let urlEmployees = constants.service.domain + constants.service.employee.name + constants.service.employee.all
        fetch(urlBranches).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                branches: json
            })
        })
        fetch(urlEmployees).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                employees: json
            })
        })
    }

    handleUploadImage(branchId) {
        let formData = new FormData()
        formData.append("file", this.state.branchImage.file)
        console.log(formData)
        let url = constants.service.domain + constants.service.import.name + constants.service.import.branchImage
        url = url.replace("{id}", branchId)
        fetch(url, {
            method: 'POST',
            body: formData
        })
        setTimeout(() => {
            this.setState({
                uploadImageSucceed: true
            })
        }, 2000)
    }

    handleLoadImage() {
        let image = Array.from(document.getElementById('imgUpload').files)
        if (image.length != 0) {
            let fileReader = new FileReader()
            fileReader.onload = e => {
                let url = e.target.result
                this.setState({
                    activeImageUpload: true,
                    branchImage: {
                        url: url,
                        file: image[0]
                    }
                })
            }
            fileReader.readAsDataURL(image[0])
        }
    }

    handleSwitchSegment() {
        if (!this.state.activeImageUpload) {
            let imageBox = document.getElementById('imgUpload')
            imageBox.click()
        } else {
            this.setState({
                activeImageUpload: false
            })
        }

    }

    handleSwitchAccordion(index) {
        this.setState(prevState => {
            return {
                activeAccordion: prevState.activeAccordion == index ? -1 : index,
                activePage: 1,
                editingEmpId: -1
            }
        })
    }

    handleEdit(empId) {
        this.setState({
            editingEmpId: empId
        })
    }

    handleSave() {
        if (this.state.editingEmpId != -1) {
            let oldEmp = this.state.employees.find(e => e.id == this.state.editingEmpId)
            let tmpName = document.getElementById('empName').value.trim().replace("//s+", " ")
            let lastName = ''
            let firstName = tmpName
            let spaceIndex = tmpName.lastIndexOf(" ")
            if (spaceIndex != -1) {
                lastName = tmpName.substring(0, spaceIndex)
                firstName = tmpName.substr(-(tmpName.length - spaceIndex))
            }
            let role = document.getElementById('empRole').value
            let dob = document.getElementById('empDOB').value
            let email = document.getElementById('empEmail').value
            let phone = document.getElementById('empPhone').value
            let branch = this.state.branches.find(b => b.name == document.getElementById('empBranch').firstChild.innerHTML)
            Object.assign(this.tmpEmp, {
                id: this.state.editingEmpId,
                accountId: 4,
                role: role,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: Date.parse(dob),
                email: email,
                phone: phone,
                branchId: branch.id
            })
            this.setState(prevState => {
                return {
                    employees: prevState.employees.map(emp => {
                        if (this.tmpEmp.id == emp.id) {
                            emp = this.tmpEmp
                        }
                        return emp
                    }),
                    editingEmpId: -1
                }
            })
        }
    }

    handleChangePage(page) {
        console.log(page)
        this.setState({
            activePage: page,
            editingEmpId: -1
        })
    }
}

class ManageSustenance extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sustenance: [
                // {
                //     id: 1,
                //     name: 'Black Coffee',
                //     price: 18000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: null,
                //     imageId: '1ggCyyLjCu6yqDBbLnZllOpgkFmSFySmw',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 2,
                //     name: 'Milk Coffee',
                //     price: 19000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: null,
                //     imageId: '1ggCyyLjCu6yqDBbLnZllOpgkFmSFySmw',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 3,
                //     name: 'Peach Tea',
                //     price: 23000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: null,
                //     imageId: '1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m',
                //     typeByTypeId: {
                //         id: 5,
                //         type: 'Tea',
                //         description: null
                //     },
                //     typeId: 5
                // },
                // {
                //     id: 4,
                //     name: 'Milk Tea',
                //     price: 18000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: null,
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 5,
                //         type: 'Tea',
                //         description: null
                //     },
                //     typeId: 5
                // },
                // {
                //     id: 5,
                //     name: 'Cream Puffin',
                //     price: 25000,
                //     discount: 0,
                //     unit: 4,
                //     createdDate: null,
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 1,
                //         type: 'Cake',
                //         description: null
                //     },
                //     typeId: 1
                // },
                // {
                //     id: 110,
                //     name: 'Cappuccino',
                //     price: 30000,
                //     discount: 10,
                //     unit: 1,
                //     createdDate: '2018-03-15T15:17:49.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 111,
                //     name: 'Matcha Latte',
                //     price: 32000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-15T15:17:49.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 112,
                //     name: 'Mint Soda',
                //     price: 28000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-15T15:17:49.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 4,
                //         type: 'Beverage',
                //         description: null
                //     },
                //     typeId: 4
                // },
                // {
                //     id: 113,
                //     name: 'Blue Soda',
                //     price: 30000,
                //     discount: 5,
                //     unit: 1,
                //     createdDate: '2018-03-15T15:17:49.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 4,
                //         type: 'Beverage',
                //         description: null
                //     },
                //     typeId: 4
                // },
                // {
                //     id: 114,
                //     name: 'Strawberry Soda',
                //     price: 28000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-15T15:17:49.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 4,
                //         type: 'Beverage',
                //         description: null
                //     },
                //     typeId: 4
                // },
                // {
                //     id: 115,
                //     name: 'Milk Shake',
                //     price: 25000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-15T15:17:49.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 6,
                //         type: 'Milk',
                //         description: null
                //     },
                //     typeId: 6
                // },
                // {
                //     id: 123,
                //     name: 'Espresso',
                //     price: 22000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 124,
                //     name: 'Americano',
                //     price: 25000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 125,
                //     name: 'Latte',
                //     price: 30000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m',
                //     typeByTypeId: {
                //         id: 3,
                //         type: 'Coffee',
                //         description: null
                //     },
                //     typeId: 3
                // },
                // {
                //     id: 126,
                //     name: 'Matcha Cheese Cake',
                //     price: 38000,
                //     discount: 5,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 1,
                //         type: 'Cake',
                //         description: null
                //     },
                //     typeId: 1
                // },
                // {
                //     id: 127,
                //     name: 'Blueberry Cheese Cake',
                //     price: 38000,
                //     discount: 5,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 1,
                //         type: 'Cake',
                //         description: null
                //     },
                //     typeId: 1
                // },
                // {
                //     id: 128,
                //     name: 'Cocoa Cheese Cake',
                //     price: 38000,
                //     discount: 5,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 1,
                //         type: 'Cake',
                //         description: null
                //     },
                //     typeId: 1
                // },
                // {
                //     id: 129,
                //     name: 'Traditional Cheese Cake',
                //     price: 32000,
                //     discount: 5,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 1,
                //         type: 'Cake',
                //         description: null
                //     },
                //     typeId: 1
                // },
                // {
                //     id: 130,
                //     name: 'Hotdog',
                //     price: 35000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 2,
                //         type: 'Snack',
                //         description: null
                //     },
                //     typeId: 2
                // },
                // {
                //     id: 131,
                //     name: 'Beef Hamburger',
                //     price: 38000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 2,
                //         type: 'Snack',
                //         description: null
                //     },
                //     typeId: 2
                // },
                // {
                //     id: 132,
                //     name: 'Vietnamese Traditional Bread',
                //     price: 25000,
                //     discount: 0,
                //     unit: 1,
                //     createdDate: '2018-03-19T06:36:22.000+0000',
                //     imageId: '1PKGovKY8dl6Qigk0MzDQ0OH_m8u6SVe4',
                //     typeByTypeId: {
                //         id: 2,
                //         type: 'Snack',
                //         description: null
                //     },
                //     typeId: 2
                // }
            ],
            types: [
                // {
                //     id: 1,
                //     type: 'Cake',
                //     description: null
                // },
                // {
                //     id: 2,
                //     type: 'Snack',
                //     description: null
                // },
                // {
                //     id: 3,
                //     type: 'Coffee',
                //     description: null
                // },
                // {
                //     id: 4,
                //     type: 'Beverage',
                //     description: null
                // },
                // {
                //     id: 5,
                //     type: 'Tea',
                //     description: null
                // },
                // {
                //     id: 6,
                //     type: 'Milk',
                //     description: null
                // }
            ],
            activeAccordion: -1,
            activeSubAccordion: -1,
            sustenanceImage: {},
        }

        this.driveURL = 'https://drive.google.com/uc?id='

        this.compName = 'ManageSustenance'
    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '70%' : '95%'
        return (
            <div style={{ overflowY: 'scroll', height: '100%' }}>
                <Grid style={{ width: responsiveWidth, marginLeft: '1.5%', marginTop: '1.5%' }} >
                    <Grid.Row columns={2}>
                        <Grid.Column width={14}>
                            <Accordion>
                                {
                                    this.state.types.map((type, index) => {
                                        let sustenanceOfThisType = this.state.sustenance.filter(s => s.typeByTypeId.id == type.id)
                                        return (
                                            <div>
                                                <Accordion.Title active={this.state.activeAccordion == index} index={index} onClick={() => this.handleSwitchAccordion(index)}>
                                                    <Segment style={{ borderBottom: this.state.activeAccordion == index ? '2px solid blue' : '' }} raised={this.state.activeAccordion == index} >
                                                        <Grid>
                                                            <Grid.Row verticalAlign='middle' columns={'equal'}>
                                                                <Grid.Column width={9}>
                                                                    <Header size='large'>
                                                                        <Icon name='food' size='big' />
                                                                        <Header.Content>
                                                                            {type.type}
                                                                            <Header.Subheader>
                                                                                {type.description == null ? '' : type.description}
                                                                            </Header.Subheader>
                                                                        </Header.Content>
                                                                    </Header>
                                                                </Grid.Column>
                                                                <Grid.Column textAlign='center'>
                                                                    <Statistic floated='right'>
                                                                        <Statistic.Value>
                                                                            {
                                                                                (this.state.sustenance.filter(s => s.typeByTypeId.id == type.id)).length
                                                                            }
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
                                                {
                                                    sustenanceOfThisType.map((sustenance, i) => {
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
                                                                                                {sustenance.name}
                                                                                            </Header.Content>
                                                                                        </Header>
                                                                                    </Grid.Column>
                                                                                    <Grid.Column textAlign='center'>
                                                                                        {/* <Statistic floated='right'>
                                                                <Statistic.Value>
                                                                    {
                                                                        (this.state.sustenance.filter(s => s.typeByTypeId.id == type.id)).length
                                                                    }
                                                                </Statistic.Value>
                                                                <Statistic.Label>
                                                                    Items
                            </Statistic.Label>
                                                            </Statistic> */}
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
                                                                                                    <input onChange={(e) => this.setState({ sustenancePrice: e.target.value })} />
                                                                                                    <Label>VND</Label>
                                                                                                </Input>
                                                                                            </Form.Field>
                                                                                            <Form.Field>
                                                                                                <label>Discount</label>
                                                                                                <Input placeholder={sustenance.discount} labelPosition='right'>
                                                                                                    <input onChange={(e) => this.setState({ sustenanceDiscount: e.target.value })} />
                                                                                                    <Label>%</Label>
                                                                                                </Input>
                                                                                            </Form.Field>
                                                                                            <Button onClick={() => this.handleEditSustenance(sustenance.id)} color='green' size='big'>Save</Button>
                                                                                            {
                                                                                                this.state.sustenanceImage ?
                                                                                                    (<Button onClick={() => this.handleUploadImage(sustenance.id)} icon color='blue' size='big' labelPosition='right'>
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
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Accordion>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <input onChange={e => this.handleUploadExcel(e)} type='file' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    handleUploadExcel(e) {
        console.log(e.target.files[0])
        let url = constants.service.domain + constants.service.catalog.name + constants.service.catalog.importExcel
        let fileReader = new FileReader()
        let formData = new FormData()
        formData.append("file", e.target.files[0])
        fileReader.onload = e => {
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(res => {
                console.log(res.status)
            })
        }
        fileReader.readAsBinaryString(e.target.files[0])
    }

    componentWillMount() {
        let urlSustenance = constants.service.domain + constants.service.catalog.name + constants.service.catalog.all
        let urlTypes = constants.service.domain + constants.service.type.name + constants.service.type.all

        fetch(urlSustenance).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                sustenance: json
            })
        })

        fetch(urlTypes).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                types: json
            })
        })
    }

    handleUploadImage(id) {
        let urlSustenanceImage = constants.service.domain + constants.service.catalog.name + constants.service.catalog.importImage
        urlSustenanceImage = urlSustenanceImage.replace('{id}', id)
        let formData = new FormData()
        formData.append('file', this.state.sustenanceImage.file)
        fetch(urlSustenanceImage, {
            method: 'POST',
            body: formData
        }).then(res => {
            console.log(res.status)
        })
    }

    handleSelectImage() {
        let inputImage = document.getElementById('sustenance-image')
        inputImage.click()
    }

    handleLoadImage() {
        let files = Array.from(document.getElementById('sustenance-image').files)
        if (files.length != 0) {
            let fileReader = new FileReader()
            fileReader.onload = e => {
                let url = e.target.result
                this.setState({
                    sustenanceImage: {
                        url: url,
                        file: files[0]
                    }
                })
            }
            fileReader.readAsDataURL(files[0])
        }
    }

    handleEditSustenance(id) {
        let price = this.state.sustenancePrice
        let discount = this.state.sustenanceDiscount
        let url = constants.service.domain + constants.service.catalog.name + constants.service.catalog.edit
        url = url.replace('{id}', id)
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: price,
                discount: discount
            })
        }).then(res => {
            console.log(res.status)
        })
    }

    handleSwitchAccordion(index) {
        this.setState(prevState => {
            return {
                activeAccordion: prevState.activeAccordion == index ? -1 : index,
                activeSubAccordion: -1,
                sustenanceImage: undefined
            }
        })
    }

    handleSwitchSubAccordion(index) {
        this.setState(prevState => {
            return {
                activeSubAccordion: prevState.activeSubAccordion == index ? -1 : index,
                sustenanceImage: undefined
            }
        })
    }

}

class Manage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
            orderdetails: [],
            employees: [],
            sustenance: [],
            activeAccordion: -1,
        }

        this.account = undefined
    }

    render() {
        let responsiveWidth = this.props.sideBarVisible ? '70%' : '95%'
        return (
            <div style={{ overflowY: 'scroll', height: '100%' }}>
                <Grid style={{ width: responsiveWidth, marginLeft: '1.5%', marginTop: '1.5%' }} >
                    <Grid.Row columns={2}>
                        <Grid.Column width={14}>
                            <Accordion>
                                {
                                    this.state.orders.map((customOrder, index) => {
                                        let order = customOrder.order
                                        let cashier = order.cashier
                                        {/* let cashier = this.state.employees.filter(emp => emp.accountId == order.cashierName && emp.role == account.role.name) */ }
                                        let orderDetailInThisOrder = this.state.orderdetails.filter(orderdetail => orderdetail.orderId == order.id)
                                        return (
                                            <div>
                                                <Accordion.Title active={this.state.activeAccordion == index} index={index} onClick={() => this.handleSwitchAccordion(index)}>
                                                    <Segment style={{ borderBottom: this.state.activeAccordion == index ? '2px solid blue' : '' }} raised={this.state.activeAccordion == index} >
                                                        <Grid>
                                                            <Grid.Row verticalAlign='middle' >
                                                                <Grid.Column width={6}>
                                                                    <Header size='large'>
                                                                        <Icon name='checkmark box' size='big' />
                                                                        <Header.Content>
                                                                            {
                                                                                order.id
                                                                            }
                                                                        </Header.Content>
                                                                    </Header>
                                                                </Grid.Column>
                                                                <Grid.Column width={4}>
                                                                    <Header size='large'>
                                                                        <Icon name='calendar' size='big' />
                                                                        <Header.Content>
                                                                            {
                                                                                (new Date(order.checkoutDate).toLocaleDateString()).replace(new RegExp("/", 'g'), '-')
                                                                            }
                                                                        </Header.Content>
                                                                    </Header>
                                                                </Grid.Column>
                                                                <Grid.Column textAlign='center' width={6}>
                                                                    <Statistic size='mini' floated='right'>
                                                                        <Statistic.Value>
                                                                            {order.total}
                                                                        </Statistic.Value>
                                                                        <Statistic.Label>
                                                                            Total
                                                                </Statistic.Label>
                                                                    </Statistic>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </Segment>
                                                </Accordion.Title>
                                                {
                                                    orderDetailInThisOrder.map((orderdetail, i) => {
                                                        return (
                                                            <Accordion.Content style={{ width: '95%', marginTop: '1.5%', marginLeft: '100%', transform: 'translateX(-100%)', padding: '0%' }} active={this.state.activeAccordion == index}>
                                                                <Transition animation='scale' visible={this.state.activeAccordion == index} duration={{ hide: 1, show: 350 }} >
                                                                    <Segment>
                                                                        <Grid>
                                                                            <Grid.Row verticalAlign='middle' columns={'equal'}>
                                                                                <Grid.Column width={6}>
                                                                                    <Header size='large' >
                                                                                        <Header.Content>
                                                                                            {/* {
                                                                                                    (this.state.sustenance.find(sus => sus.id == orderdetail.sustenanceId)).name
                                                                                                } */}
                                                                                        </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                                <Grid.Column width={4}>
                                                                                    <Header size='large' >
                                                                                        <Header.Content>
                                                                                            {
                                                                                                orderdetail.quantity
                                                                                            }
                                                                                        </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                                <Grid.Column width={6}>
                                                                                    <Header size='large' >
                                                                                        <Header.Content>
                                                                                            {
                                                                                                orderdetail.total
                                                                                            }
                                                                                        </Header.Content>
                                                                                    </Header>
                                                                                </Grid.Column>
                                                                            </Grid.Row>
                                                                        </Grid>
                                                                    </Segment>
                                                                </Transition>

                                                            </Accordion.Content>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Accordion>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Input onChange={(e) => this.handleLoadOrderByDate(e.target.value)} type='date' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    handleLoadOrderByDate(date) {
        let urlOrderByDate = constants.service.domain + constants.service.order.name + constants.service.order.date
        urlOrderByDate = urlOrderByDate.replace('{date}', date + ' 00:00:00')
        fetch(urlOrderByDate).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                orders: json
            })
        })
    }

    handleSwitchAccordion(index) {
        this.setState(prevState => {
            return {
                activeAccordion: prevState.activeAccordion == index ? -1 : index,
                activeSubAccordion: -1,
            }
        })
    }

    handleSwitchSubAccordion(index) {
        this.setState(prevState => {
            return {
                activeSubAccordion: prevState.activeSubAccordion == index ? -1 : index,
            }
        })
    }


    componentWillMount() {
        let urlOrders = constants.service.domain + constants.service.order.name + constants.service.order.all
        let urlEmployees = constants.service.domain + constants.service.employee.name + constants.service.employee.all
        let urlEmployeeById = constants.service.domain + constants.service.employee.name + constants.service.employee.getById
        let urlOrderDetails = constants.service.domain + constants.service.orderDetail.name + constants.service.orderDetail.all
        let urlSustenance = constants.service.domain + constants.service.catalog.name + constants.service.catalog.all

        fetch(urlOrders).then(res => {
            return res.json()
        }).then(orders => {
            // orders.forEach(order => {
            //     let cashierId = order.order.cashierId
            //     let urlab = urlEmployeeById.replace('{id}', cashierId)

            //     fetch(urlab).then(r => {
            //         alert(r.status)
            //         return r.json()
            //     }).then(c => {
            //         order.order.cashier = c
            //     })
            // })
            this.setState({
                orders: orders
            })
        })

        fetch(urlOrderDetails).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                orderdetails: json
            })
        })

        fetch(urlEmployees).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                employees: json
            })
        })

        fetch(urlSustenance).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                sustenance: json
            })
        })
    }


    // getOrderDetailsByOrderId(id) {
    //     let urlOrderDetails = constants.service.domain + constants.service.orderDetail.name + constants.service.orderDetail.get
    //     let orders = this.state.orders
    //     orders.map(order => {
    //         let url = urlOrderDetails.replace('{id}', order.order.id)
    //         fetch(url).then(res => {
    //             return res.json()
    //         }).then(json => {
    //             console.log(json)
    //         })
    //     })
    // }
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
            categories: CATEGORY,
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
                {
                    this.state.items.length > 0 ?
                        (<Accordion style={{ width: '75%', marginLeft: '1.5%', marginTop: '1.5%' }}>
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
            payRequestOrders: []
        }
    }

    render() {
        let payRequestOrders = this.state.payRequestOrders
        return (
            <div style={{ height: '100%', overflowY: 'scroll' }}>
                <Grid style={{ width: '75%', marginLeft: '1.5%', marginTop: '1.5%' }}>
                    <Grid.Row columns={3}>
                        <Grid.Column width={4}>
                            <Segment>
                                <Header icon textAlign='center'>
                                    <Icon size='large' name='remove' />
                                    Waiting Queue
                                </Header>
                                <Divider />
                                <div style={{ height: '100%' }}>
                                    <Segment basic style={{ height: window.innerHeight - (window.innerHeight * 30 / 100), overflowY: 'scroll' }}>
                                        {
                                            payRequestOrders.length <= 0 ?
                                                null :
                                                payRequestOrders.map(order => {
                                                    return (
                                                        <Card>
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
                                        <Grid.Column>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Header icon textAlign='center'>
                                                <Icon name='search' />
                                                Order Detail
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' textAlign='right'>
                                            <Button size='huge' color='blue'>
                                                Checkout
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Divider />
                                <Segment style={{ height: window.innerHeight - (window.innerHeight * 30 / 100), overflowY: 'scroll' }}>

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
                                <Segment style={{ height: window.innerHeight - (window.innerHeight * 30 / 100), overflowY: 'scroll' }}>

                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        this.getAllPayRequestOrders()
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
}
