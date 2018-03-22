let constant = {
    service:{
        domain: 'http://192.168.100.127:9999/',
        catalog: {
            name: 'cobra-catalog-service/',
            all: 'sustenance',
            importExcel: 'import',
            edit: 'sustenance/{id}'
        },
        order:{
            name: 'cobra-order-service/',
            all: 'orders',
            date: '{id}/status=CheckedOut/date='
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
        },
        import:{
            name: 'cobra-branch-service/',
            branchImage: 'branches/{id}/images',
        }
    }
}

export default constant