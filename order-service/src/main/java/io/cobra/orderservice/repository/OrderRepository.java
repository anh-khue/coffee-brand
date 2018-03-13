package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    List<OrderEntity> findAll();

    OrderEntity findById(int id);
}
