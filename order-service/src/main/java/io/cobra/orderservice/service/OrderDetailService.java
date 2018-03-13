package io.cobra.orderservice.service;

import io.cobra.orderservice.model.OrderDetailEntity;
import io.cobra.orderservice.repository.OrderDetailRepository;

public class OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }

    public void createOrderDetail(OrderDetailEntity orderDetailEntity){
        this.orderDetailRepository.save(orderDetailEntity);
    }
}
