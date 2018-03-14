package io.cobra.orderservice.controller;

import io.cobra.orderservice.exception.OrderNotFoundException;
import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
public class OrderController {
    
    private final OrderService orderService;
    
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAll() {
        List<Order> orders = this.orderService.getAll();
        return !orders.isEmpty() ? status(OK).body(orders)
                                 : status(NO_CONTENT).build();
    }
    
    @PostMapping(value = "/orders", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity create(@RequestBody Order order) {
        return status(CREATED).body(orderService.create(order));
    }
    
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getById(@PathVariable("id") int id) {
        return this.orderService.getById(id)
                                .map(status(OK)::body)
                                .orElseGet(status(NOT_FOUND)::build);
    }
    
    @DeleteMapping(value = "/orders/{id}")
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") int id) {
        this.orderService.delete(id);
    }
//
//    @PutMapping(value = "/orders/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public void update(@RequestBody Order order, @PathVariable("id") String id) {
//        if (this.orderService.getById(order.getId()) != null) {
//            order.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
//            this.orderService.update(order);
//        }
//    }
    
    @PutMapping(value = "/orders/{id}/checkout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity checkout(@PathVariable("id") String id) {
        try {
            Double total = orderService.checkout(Integer.parseInt(id));
            return status(ACCEPTED).body(total);
        } catch (OrderNotFoundException e) {
            return status(NOT_FOUND).build();
        }
    }
    
    @PutMapping(value = "/orders/{id}/cancel", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity cancel(@PathVariable("id") String id) {
        try {
            Integer status = orderService.cancel(Integer.parseInt(id));
            return status(ACCEPTED).body(status);
        } catch (OrderNotFoundException e) {
            return status(NOT_FOUND).build();
        }
    }
}
