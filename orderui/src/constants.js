let constant = {
    service:{
        domain: 'http://192.168.100.178:9999/',
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
        type: {
            name: 'cobra-catalog-service/',
            all: 'types'
        },
        login:{
            name: 'cobra-auth-service/',
            signin: 'signin'
        }
    }
}

export default constant