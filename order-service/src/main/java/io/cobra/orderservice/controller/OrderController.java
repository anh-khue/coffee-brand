package io.cobra.orderservice.controller;


import io.cobra.orderservice.constant.Constant;
import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class OrderController {

    private final OrderService orderService;


    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = "/receipt", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertOrder(@RequestBody Order order) {
        order.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
        order.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        order.setStatus(Constant.ON_GOING);
        orderService.create(order);
    }

    @GetMapping("/receipt")
    public List<Order> viewAllReciept() {
        return this.orderService.getAll();
    }

    @GetMapping("/receipt/{id}")
    public Order getReceitById(@PathVariable("id") int id) {
        return this.orderService.findById(id);
    }

    @DeleteMapping(value = "/receipt/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void removeReceipt(@PathVariable("id") int id) {
        this.orderService.delete(id);
    }

    @PutMapping(value = "/receipt/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateReceipt(@RequestBody Order order) {
        if (this.orderService.findById(order.getId()) != null) {
            order.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
            order.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
            order.setStatus(Constant.ON_GOING);
            this.orderService.update(order);
        }
    }
}
