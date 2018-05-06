package io.cobra.customerservice.repository;

import io.cobra.customerservice.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findById(int id);

    List<Customer> findAll();

    Customer findByEmail(String email);

    Customer findByLevelId(int levelId);
}
