package io.cobra.orderservice.service;

import io.cobra.orderservice.model.Order;
import io.cobra.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAll(){
        return this.orderRepository.findAll();
    }

    public void create(Order order){
        this.orderRepository.save(order);
    }

    public Order findById(int id){
        return this.orderRepository.findById(id);
    }

    public void delete(int id){
        this.orderRepository.deleteById(id);
    }

    public void update(Order order){
        if(this.orderRepository.
                findByCashierIdAndMemberId(order.getCashierId()
                        , order.getMemberId())!=null){
            this.orderRepository.save(order);
        }
    }

}
