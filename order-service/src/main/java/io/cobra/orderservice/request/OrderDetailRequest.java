package io.cobra.orderservice.request;

import io.cobra.orderservice.model.OrderDetail;

public class OrderDetailRequest {
    
    private final OrderDetail orderDetail;
    private final double sustenanceDiscountRate;
    private final double customerDiscountRate;
    
    public OrderDetailRequest(OrderDetail orderDetail, double sustenanceDiscountRate, double customerDiscountRate) {
        this.orderDetail = orderDetail;
        this.sustenanceDiscountRate = sustenanceDiscountRate;
        this.customerDiscountRate = customerDiscountRate;
    }
    
    public OrderDetail getOrderDetail() {
        return orderDetail;
    }
    
    public double getSustenanceDiscountRate() {
        return sustenanceDiscountRate;
    }
    
    public double getCustomerDiscountRate() {
        return customerDiscountRate;
    }
}
