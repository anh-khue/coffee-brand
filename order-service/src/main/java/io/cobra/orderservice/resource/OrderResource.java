package io.cobra.orderservice.resource;

import io.cobra.orderservice.model.Order;

import static io.cobra.orderservice.constant.OrderConstant.POINT_RATE;

public class OrderResource {
    
    private final Order order;
    private final double point;
    
    public OrderResource(Order order) {
        this.order = order;
        this.point = order.getTotal() * (POINT_RATE / 100);
    }
    
    public Order getOrder() {
        return order;
    }
    
    public double getPoint() {
        return point;
    }
}
