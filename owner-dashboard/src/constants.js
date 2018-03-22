let constant = {
    service:{
        domain: 'http://192.168.100.39:9999/',
        catalog: {
            name: 'cobra-catalog-service/',
            all: 'sustenance',
            importExcel: 'import',
            edit: 'sustenance/{id}',
            importImage: 'sustenance/{id}/image'
        },
        branch:{
            name: 'cobra-branch-service/',
            all: 'branches'

        },
        employee:{
            name: 'cobra-employee-service/',
            all: 'employees',
            getById: 'employees/{id}'
        },
        order:{
            name: 'cobra-order-service/',
            all: 'orders',
            date: '{id}/status=CheckedOut/date='
        },
        orderDetail:{
            name: 'cobra-order-service/',
            get: 'order_details/{id}'
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
        },
        account:{
            name: 'cobra-auth-service/',
            get: 'accounts/{id}'
        }
    }
}

export default constant