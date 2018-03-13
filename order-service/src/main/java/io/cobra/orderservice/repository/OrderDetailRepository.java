package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.OrderDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
}
