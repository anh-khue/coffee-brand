package io.cobra.orderservice.service;

import io.cobra.orderservice.exception.OrderNotFoundException;
import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static io.cobra.orderservice.constant.OrderConstant.CANCEL;
import static io.cobra.orderservice.constant.OrderConstant.CHECKED_OUT;
import static io.cobra.orderservice.constant.OrderConstant.ON_GOING;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    public List<Order> getAll() {
        return this.orderRepository.findAll();
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
            order.setStatus(CANCEL);
            orderRepository.save(order);
            
            return order.getStatus();
        }).orElseThrow(() -> new OrderNotFoundException(orderId));
    }
    
    public void updateTotal(Order order) {
        this.orderRepository.findByCashierIdAndMemberId(order.getCashierId(), order.getMemberId())
                            .ifPresent(this.orderRepository::save);
    }
}
