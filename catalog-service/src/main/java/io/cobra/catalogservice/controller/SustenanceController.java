package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.model.Ingredient;
import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.repository.SustenanceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SustenanceController {
    private final SustenanceRepository sustenanceRepository;

    public SustenanceController(SustenanceRepository sustenanceRepository) {
        this.sustenanceRepository = sustenanceRepository;
    }

    @GetMapping("/sustenance")
    public List<Sustenance> findAll() {
        return this.sustenanceRepository.findAll();
    }

    @GetMapping("/sustenance/{id}")
    public Sustenance findById(@PathVariable("id") int id) {
        return this.sustenanceRepository.findByIdEquals(id);
    }

//    @GetMapping("/sustenance/{id}/ingredients")
//    public List<Ingredient> viewIngredients(@PathVariable("id") int id) {
//
//    }
}
