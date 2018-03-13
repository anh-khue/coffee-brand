package io.cobra.orderservice.controller;


import io.cobra.orderservice.model.OrderEntity;
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

    @PostMapping(value = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertOrder(@RequestBody OrderEntity orderEntity) {
        orderEntity.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
        orderEntity.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        orderService.createOrder(orderEntity);
    }

    @GetMapping("/order")
    public List<OrderEntity> viewAllSustenance() {
        return this.orderService.getAll();
    }

    @GetMapping("/order/{id}")
    public OrderEntity getOrderById(@PathVariable("id") int id) {
        return this.orderService.findOrderById(id);
    }
}
