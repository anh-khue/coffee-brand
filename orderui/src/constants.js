let constant = {
    service:{
        domain: 'http://192.168.100.39:9999/',
        catalog: {
            name: 'cobra-catalog-service/',
            all: 'sustenance'
        },
        order:{
            name: 'cobra-order-service/',
            all: 'orders'
        },
        orderDetail:{
            name: 'cobra-order-service/',
            all: 'order_details'
        },
        employee:{
            name:'cobra-employee-service/',
            all: 'employees',
            getByAccountId: 'employees/accountId={accountId}'
        },
        type: {
            name: 'cobra-catalog-service/',
            all: 'types'
        },
        login:{
            name: 'cobra-auth-service/',
            signin: 'signin'
        },
        customer:{
            name: 'cobra-customer-service/',
            getByEmail: 'customer/email={email}'
        }
    }
}

export default constant