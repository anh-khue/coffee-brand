package io.cobra.orderservice.controller;

import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.service.OrderDetailService;
import io.cobra.orderservice.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderDetailController {

    private final OrderDetailService orderDetailService;
    private final OrderService orderService;

    public OrderDetailController(OrderDetailService orderDetailService, OrderService orderService) {
        this.orderDetailService = orderDetailService;
        this.orderService = orderService;
    }


    @PostMapping(value = "/order_detail", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insetOrderDetail(@RequestBody OrderDetail orderDetail) {
        double total = 0;
        double discount = 0;
        Order order = this.orderService.findById(orderDetail.getOrderId());
        List<OrderDetail> orderDetailList = this.orderDetailService.getOrderDetailByOrderId(orderDetail.getOrderId());
        total = orderDetail.getPrice() * orderDetail.getQuantity();

        //total without discount
        if (orderDetail.getMemberDiscountRate() == 0) {
            orderDetail.setTotal(total);
            for (OrderDetail eachOrderDetail : orderDetailList) {
                total += eachOrderDetail.getTotal();
            }
            order.setTotal(total);

        //total with discount
        } else {
            if (orderDetail.getDiscountRate() > orderDetail.getMemberDiscountRate()) {
                discount = orderDetail.getDiscountRate();
            } else if (orderDetail.getDiscountRate() < orderDetail.getMemberDiscountRate()) {
                discount = orderDetail.getMemberDiscountRate();
            }
            orderDetail.setTotal(total * discount);
            for (OrderDetail eachOrderDetail : orderDetailList) {
                total += eachOrderDetail.getTotal();
            }
            order.setTotal(total);
        }

        this.orderService.create(order);
        this.orderDetailService.createOrderDetail(orderDetail);
    }

    @GetMapping("/order_detail")
    public List<OrderDetail> viewAllOrderDetail() {
        return this.orderDetailService.getALl();
    }

    @GetMapping("/order_detail/{id}")
    public OrderDetail viewOrderDetailById(@PathVariable("id") int id) {
        return this.orderDetailService.getOrderDetailById(id);
    }

    @DeleteMapping(value = "/order_detail/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void removeOrderDetail(@PathVariable("id") int id) {
        this.orderDetailService.deleteOrderDetail(id);
    }

    @PutMapping(value = "/order_detail/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateOrderDetail(@RequestBody OrderDetail orderDetail) {
        double total = 0;
        if (this.orderDetailService.getOrderDetailById(orderDetail.getId()) != null) {
            this.orderDetailService.updateOrderDetail(orderDetail);
            Order order = this.orderService.findById(orderDetail.getOrderId());
            List<OrderDetail> orderDetailList = this.orderDetailService.getOrderDetailByOrderId(order.getId());

            //update order total
            for (OrderDetail eachOrderDetail : orderDetailList) {
                total += eachOrderDetail.getTotal();
            }
            order.setTotal(total);
            this.orderService.update(order);
        }
    }

}
