package io.cobra.orderservice.controller;

import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.service.OrderDetailService;
import io.cobra.orderservice.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
public class OrderDetailController {
    
    private final OrderDetailService orderDetailService;
    private final OrderService orderService;
    
    public OrderDetailController(OrderDetailService orderDetailService, OrderService orderService) {
        this.orderDetailService = orderDetailService;
        this.orderService = orderService;
    }
    
    @GetMapping("/order_details")
    public ResponseEntity<List<OrderDetail>> getAll() {
        List<OrderDetail> orderDetails = this.orderDetailService.getAll();
        return !orderDetails.isEmpty() ? status(OK).body(orderDetails)
                                       : status(NO_CONTENT).build();
    }
    
    @PostMapping(value = "/order_details", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity create(@RequestBody OrderDetail orderDetail,
                                 Double sustenanceDiscountRate,
                                 Double memberDiscountRate) {
        int newId = this.orderDetailService.create(orderDetail, sustenanceDiscountRate, memberDiscountRate);
        orderService.updateTotal(orderDetail.getOrderId());
        return newId > 0 ? status(ACCEPTED).body(newId)
                         : status(CONFLICT).build();
    }
    
    @GetMapping("/order_details/{id}")
    public ResponseEntity<OrderDetail> getById(@PathVariable("id") int id) {
        return this.orderDetailService.getById(id)
                                      .map(status(OK)::body)
                                      .orElseGet(status(NOT_FOUND)::build);
    }
    
    @DeleteMapping(value = "/order_details/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") int id) {
        this.orderDetailService.delete(id);
    }
}
