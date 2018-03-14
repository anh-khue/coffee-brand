package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    
    List<OrderDetail> findAll();
    
    Optional<OrderDetail> findByOrderIdAndSustenanceId(int orderId, int sustenanceId);
    
    List<OrderDetail> findByOrderId(Integer receiptId);
}
