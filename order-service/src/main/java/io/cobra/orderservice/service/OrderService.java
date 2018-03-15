package io.cobra.orderservice.service;

import io.cobra.orderservice.exception.OrderNotFoundException;
import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static io.cobra.orderservice.constant.OrderConstant.*;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final OrderDetailService orderDetailService;
    
    public OrderService(OrderRepository orderRepository, OrderDetailService orderDetailService) {
        this.orderRepository = orderRepository;
        this.orderDetailService = orderDetailService;
    }
    
    public List<Order> getAll() {
        return this.orderRepository.findAll();
    }
    
    public List<Order> getByStatus(String status) {
        switch (status) {
            case "checked_out":
                return orderRepository.findByStatus(CHECKED_OUT);
            case "cancelled":
                return orderRepository.findByStatus(CANCELLED);
        }
        return new ArrayList<>();
    }
    
    public List<Order> getByStatusAndDate(String status, Timestamp date) {
        switch (status) {
            case "checked_out":
                return orderRepository.findByStatus(CHECKED_OUT).stream()
                                      .filter(order -> order.getCheckoutDate() == date)
                                      .collect(Collectors.toList());
            case "cancelled":
                return orderRepository.findByStatus(CANCELLED).stream()
                                      .filter(order -> order.getCreatedDate() == date)
                                      .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
    
    public Optional<Order> getById(int id) {
        return this.orderRepository.findById(id);
    }
    
    public Integer create(Order order) {
        order.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        order.setStatus(ON_GOING);
        
        this.orderRepository.save(order);
        this.orderRepository.flush();
        
        return order.getId();
    }
    
    public void delete(int id) {
        this.orderRepository.deleteById(id);
    }
    
    public Double checkout(int orderId) throws OrderNotFoundException {
        return getById(orderId).map(order -> {
            order.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
            order.setStatus(CHECKED_OUT);
            orderRepository.save(order);
            
            return order.getTotal();
        }).orElseThrow(() -> new OrderNotFoundException(orderId));
    }
    
    public Integer cancel(int orderId) throws OrderNotFoundException {
        return getById(orderId).map(order -> {
            order.setStatus(CANCELLED);
            orderRepository.save(order);
            
            return order.getStatus();
        }).orElseThrow(() -> new OrderNotFoundException(orderId));
    }
    
    public void updateTotal(int id) {
        this.orderRepository.findById(id)
                            .ifPresent(this::updateTotal);
    }
    
    private void updateTotal(Order order) {
        List<OrderDetail> orderDetails = orderDetailService.getByOrderId(order.getId());
        double total = 0;
        for (OrderDetail orderDetail : orderDetails) {
            total += orderDetail.getTotal();
        }
        order.setTotal(total);
        orderRepository.save(order);
    }
}
