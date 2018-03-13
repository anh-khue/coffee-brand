package io.cobra.orderservice.service;

import io.cobra.orderservice.model.OrderEntity;
import io.cobra.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderEntity> getAll(){
        return this.orderRepository.findAll();
    }

    public void createOrder(OrderEntity orderEntity){
        this.orderRepository.save(orderEntity);
    }

    public OrderEntity findOrderById(int id){
        return this.orderRepository.findById(id);
    }
}
