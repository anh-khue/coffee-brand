package io.cobra.catalogservice.repository;

import io.cobra.catalogservice.model.Sustenance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SustenanceRepository extends JpaRepository<Sustenance, Integer> {
    Sustenance findByIdEquals(int id);
}
