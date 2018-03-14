package io.cobra.orderservice.repository;

import io.cobra.orderservice.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {

    List<Receipt> findAll();

    Receipt findById(int id);

}
