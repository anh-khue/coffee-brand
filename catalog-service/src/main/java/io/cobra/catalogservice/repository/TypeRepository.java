package io.cobra.catalogservice.repository;

import io.cobra.catalogservice.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<Type, Integer> {
    Type findById(int id);
}
