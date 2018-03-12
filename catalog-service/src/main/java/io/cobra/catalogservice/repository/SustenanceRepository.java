package io.cobra.catalogservice.repository;

import io.cobra.catalogservice.model.Sustenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SustenanceRepository extends JpaRepository<Sustenance, Integer> {
    Sustenance findById(int id);
}
