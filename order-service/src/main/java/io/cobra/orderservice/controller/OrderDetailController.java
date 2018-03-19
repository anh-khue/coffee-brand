package io.cobra.orderservice.controller;

import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.request.OrderDetailRequest;
import io.cobra.orderservice.service.OrderDetailService;
import io.cobra.orderservice.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
@CrossOrigin
public class OrderDetailController {
    
    private final OrderDetailService orderDetailService;
    private final OrderService orderService;
    
    public OrderDetailController(OrderDetailService orderDetailService, OrderService orderService) {
        this.orderDetailService = orderDetailService;
        this.orderService = orderService;
    }

//    @GetMapping("/order_details")
//    public ResponseEntity<List<OrderDetail>> getAll() {
//        List<OrderDetail> orderDetails = this.orderDetailService.getAll();
//        return !orderDetails.isEmpty() ? status(OK).body(orderDetails)
//                                       : status(NO_CONTENT).build();
//    }
    
    @PostMapping(value = "/order_details", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderDetail> create(@RequestBody OrderDetailRequest request) {
        OrderDetail orderDetail = request.getOrderDetail();
        OrderDetail newOrderDetail = this.orderDetailService.create(orderDetail,
                                                                    request.getSustenanceDiscountRate(),
                                                                    request.getCustomerDiscountRate());
        orderService.updateTotal(orderDetail.getOrderId());
        return status(ACCEPTED).body(newOrderDetail);
    }
    
    @GetMapping("/order_details/{id}")
    public ResponseEntity<OrderDetail> getById(@PathVariable("id") String id) {
        return this.orderDetailService.getById(Integer.parseInt(id))
                                      .map(status(OK)::body)
                                      .orElseGet(status(NOT_FOUND)::build);
    }
    
    @DeleteMapping(value = "/order_details/{id}")
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") int id) {
        int orderId = orderDetailService.getById(id)
                                        .map(OrderDetail::getOrderId)
                                        .orElse(-1);
        this.orderDetailService.delete(id);
        orderService.updateTotal(orderId);
    }
}
