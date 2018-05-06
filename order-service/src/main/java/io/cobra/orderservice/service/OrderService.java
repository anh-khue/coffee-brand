package io.cobra.orderservice.service;

import io.cobra.orderservice.exception.OrderNotFoundException;
import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.model.OrderDetail;
import io.cobra.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

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
    
    public List<Order> getCheckoutByDate(Timestamp date) {
        Timestamp nextDay = getStartOfNextDay(date);
        
        return orderRepository.findByCheckoutDateBetween(date, nextDay);
    }
    
    public List<Order> getCheckoutToday() {
        return orderRepository.findByCheckoutDateBetween(Timestamp.valueOf(LocalDate.now().atStartOfDay()),
                                                         Timestamp.valueOf(LocalDateTime.now()));
    }
    
    private Timestamp getStartOfDate(Timestamp date) {
        Calendar calendar = Calendar.getInstance();
        
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        
        return new Timestamp(calendar.getTimeInMillis());
    }
    
    private Timestamp getStartOfNextDay(Timestamp date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(getStartOfDate(date));
        calendar.add(Calendar.DATE, 1);
        
        return new Timestamp(calendar.getTimeInMillis());
    }
    
    public Optional<Order> getById(int id) {
        return this.orderRepository.findById(id);
    }
    
    public Order create(Order order) {
        order.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        order.setStatus(ON_GOING);
        
        this.orderRepository.save(order);
        this.orderRepository.flush();
        
        return order;
    }
    
    public void delete(int id) {
        this.orderRepository.deleteById(id);
    }
    
    public Order checkout(int orderId) throws OrderNotFoundException {
        return getById(orderId).map(order -> {
            order.setCheckoutDate(Timestamp.valueOf(LocalDateTime.now()));
            order.setStatus(CHECKED_OUT);
            orderRepository.save(order);
            
            return order;
        }).orElseThrow(() -> new OrderNotFoundException(orderId));
    }
    
    public Order cancel(int orderId) throws OrderNotFoundException {
        return getById(orderId).map(order -> {
            order.setStatus(CANCELLED);
            orderRepository.save(order);
            
            return order;
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
