package io.cobra.customerservice.repository;

import io.cobra.customerservice.model.Levels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LevelRepository extends JpaRepository<Levels, Integer> {

    Levels findById(int id);

    List<Levels> findAll();

    Void deleteById(int id);
}
