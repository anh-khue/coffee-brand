package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    
    List<Order> findAll();
    
    List<Order> findByStatus(int statusConstant);
    
    List<Order> findByCheckoutDateBetween(Timestamp start, Timestamp end);
}
