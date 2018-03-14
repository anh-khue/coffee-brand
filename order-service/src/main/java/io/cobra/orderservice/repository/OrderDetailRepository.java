package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    OrderDetail findById(int id);

    List<OrderDetail> findAll();

    OrderDetail findBySustenanceIdAndOrderId(int sustenanceId, int orderId);

    List<OrderDetail> findAllByOrderId(int receiptId);
}
