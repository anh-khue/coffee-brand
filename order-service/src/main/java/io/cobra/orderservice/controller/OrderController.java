package io.cobra.orderservice.controller;

import io.cobra.orderservice.exception.OrderNotFoundException;
import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.resource.OrderResource;
import io.cobra.orderservice.service.OrderDetailService;
import io.cobra.orderservice.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
@CrossOrigin
public class OrderController {
    
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;
    
    public OrderController(OrderService orderService,
                           OrderDetailService orderDetailService) {
        this.orderService = orderService;
        this.orderDetailService = orderDetailService;
    }
    
    @GetMapping(value = "/orders", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderResource>> getAll() {
        List<Order> orders = this.orderService.getAll();
        List<OrderResource> resources = orders.stream()
                                              .map(OrderResource::new)
                                              .collect(Collectors.toList());
        
        return !orders.isEmpty() ? status(OK).body(resources)
                                 : status(NO_CONTENT).build();
    }
    
    @PostMapping(value = "/orders", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResource> create(@RequestBody Order order) {
        return status(CREATED).body(new OrderResource(orderService.create(order)));
    }
    
    @GetMapping(value = "/orders/status={status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderResource>> getByStatus(@PathVariable("status") String status) {
        List<Order> orders;
        switch (status.toLowerCase()) {
            case "checked_out":
            case "cancelled":
                orders = orderService.getByStatus(status.toLowerCase());
                break;
            default:
                return status(NOT_ACCEPTABLE).build();
        }
        List<OrderResource> resources = orders.stream()
                                              .map(OrderResource::new)
                                              .collect(Collectors.toList());
        return !orders.isEmpty() ? status(OK).body(resources)
                                 : status(NO_CONTENT).build();
    }
    
    @GetMapping(value = "/orders/status=checked_out/date={date}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderResource>> getCheckoutByDate(@PathVariable("date") String date) {
        List<Order> orders = orderService.getCheckoutByDate(Timestamp.valueOf(date));
        List<OrderResource> resources = orders.stream()
                                              .map(OrderResource::new)
                                              .collect(Collectors.toList());
        return !orders.isEmpty() ? status(OK).body(resources)
                                 : status(NO_CONTENT).build();
    }
    
    @GetMapping(value = "/orders/status=checked_out/today", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderResource>> getCheckoutToday() {
        List<Order> orders = orderService.getCheckoutToday();
        List<OrderResource> resources = orders.stream()
                                              .map(OrderResource::new)
                                              .collect(Collectors.toList());
        return !orders.isEmpty() ? status(OK).body(resources)
                                 : status(NO_CONTENT).build();
    }
    
    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderResource> getById(@PathVariable("id") String id) {
        return this.orderService.getById(Integer.parseInt(id))
                                .map(order -> status(OK).body(new OrderResource(order)))
                                .orElseGet(status(NOT_FOUND)::build);
    }
    
    @DeleteMapping(value = "/orders/{id}")
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") int id) {
        this.orderService.delete(id);
    }
    
    @GetMapping(value = "/orders/{id}/details", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderDetail>> getDetailsById(@PathVariable("id") String id) {
        List<OrderDetail> orderDetails = this.orderDetailService.getByOrderId(Integer.parseInt(id));
        return !orderDetails.isEmpty() ? status(OK).body(orderDetails)
                                       : status(NO_CONTENT).build();
    }
    
    @PutMapping(value = "/orders/{id}/checkout")
    public ResponseEntity<OrderResource> checkout(@PathVariable("id") String id) {
        try {
            Order order = orderService.checkout(Integer.parseInt(id));
            return status(ACCEPTED).body(new OrderResource(order));
        } catch (OrderNotFoundException e) {
            return status(NOT_FOUND).build();
        }
    }
    
    @PutMapping(value = "/orders/{id}/cancel")
    public ResponseEntity<OrderResource> cancel(@PathVariable("id") String id) {
        try {
            Order order = orderService.cancel(Integer.parseInt(id));
            return status(ACCEPTED).body(new OrderResource(order));
        } catch (OrderNotFoundException e) {
            return status(NOT_FOUND).build();
        }
    }
}
