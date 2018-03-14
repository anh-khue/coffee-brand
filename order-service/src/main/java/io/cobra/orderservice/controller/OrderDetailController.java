package io.cobra.orderservice.controller;

import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.service.OrderDetailService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.status;

@RestController
public class OrderDetailController {
    
    private final OrderDetailService orderDetailService;
    
    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    
    @GetMapping("/order_details")
    public ResponseEntity<List<OrderDetail>> getAll() {
        List<OrderDetail> orderDetails = this.orderDetailService.getAll();
        return !orderDetails.isEmpty() ? status(OK).body(orderDetails)
                                       : status(NO_CONTENT).build();
    }
    
    @PostMapping(value = "/order_details", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody OrderDetail orderDetail) {
                this.orderService.create(order);
        this.orderDetailService.create(orderDetail);
    }
    
    @GetMapping("/order_details/{id}")
    public OrderDetail getById(@PathVariable("id") int id) {
        return this.orderDetailService.getById(id);
    }
    
    @DeleteMapping(value = "/order_details/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable("id") int id) {
        this.orderDetailService.delete(id);
    }
    
    @PutMapping(value = "/order_detail/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody OrderDetail orderDetail) {
        double total = 0;
        if (this.orderDetailService.getById(orderDetail.getId()) != null) {
            this.orderDetailService.update(orderDetail);
            Order order = this.orderService.getById(orderDetail.getOrderId());
            List<OrderDetail> orderDetailList = this.orderDetailService.getByOrderId(order.getId());
            
            //update order total
            for (OrderDetail eachOrderDetail : orderDetailList) {
                total += eachOrderDetail.getTotal();
            }
            order.setTotal(total);
            this.orderService.update(order);
        }
    }
    
}
