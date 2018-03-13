package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.model.SustenanceHasIngredient;
import io.cobra.catalogservice.service.SustenanceService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@RestController
public class SustenanceController {
    private final SustenanceService sustenanceService;

    public SustenanceController(SustenanceService sustenanceService) {
        this.sustenanceService = sustenanceService;
    }

    @GetMapping("/sustenance")
    public List<Sustenance> viewAllSustenance() {
        return this.sustenanceService.getAll();
    }

    @GetMapping("/sustenance/{id}")
    public Sustenance viewSustenanceById(@PathVariable("id") int id) {
        return this.sustenanceService.getById(id);
    }

    @GetMapping("/sustenance/{id}/ingredients")
    public List<SustenanceHasIngredient> viewIngredientsBySustenanceId(@PathVariable("id") int sustenanceId) {
        return this.sustenanceService.getContainedIngredients(sustenanceId);
    }

    @PostMapping(value = "/sustenance", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createSustenance(@RequestBody Sustenance sustenance, File image) {
        this.sustenanceService.create(sustenance, image);
    }

    @GetMapping("types/{id}/sustenance")
    public List<Sustenance> viewSustenanceByTypeId(@PathVariable("id") int typeId) {
        return this.sustenanceService.getByTypeId(typeId);
    }
}
