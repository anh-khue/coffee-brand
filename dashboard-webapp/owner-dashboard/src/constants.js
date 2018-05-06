let constant = {
    domain: 'http://25.14.138.194:8080',
    login: '/login',
    getAllItems: '/items',
    getAllCategories: '/categories',
    getItemById: '/items/{id}',
    editItemById: '/items',
    getPayRequestOrders: '/checkout-receipts',
    getReceiptDetailsByReceiptSeqId: '/receipts-detail/{id}',
    checkoutOrder: '/checkout/{receiptSeq}',
    getAllCheckedOutOrders: '/checkedout-receipts',
    getAllTables: '/tables',
    getReceiptByTableId: '/tables/{id}/receipts',
    getAllReceipts: '/receipts'
}

export default constant