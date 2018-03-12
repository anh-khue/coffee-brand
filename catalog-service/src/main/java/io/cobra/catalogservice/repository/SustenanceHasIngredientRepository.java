package io.cobra.catalogservice.repository;

import io.cobra.catalogservice.model.SustenanceHasIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SustenanceHasIngredientRepository extends JpaRepository<SustenanceHasIngredient, Integer> {
    List<SustenanceHasIngredient> findBySustenanceId(int sustenanceId);
}