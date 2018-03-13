package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.ReceiptEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<ReceiptEntity, Integer> {

    List<ReceiptEntity> findAll();

    ReceiptEntity findById(int id);
}
