package io.cobra.customerservice.repository;

import io.cobra.customerservice.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LevelRepository extends JpaRepository<Level, Integer> {
    
    Level findById(int id);
    
    List<Level> findAll();
}
