package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findAll();

    Order findById(int id);

    Order findByCashierIdAndMemberId(int cashierId, int memberId);

}
