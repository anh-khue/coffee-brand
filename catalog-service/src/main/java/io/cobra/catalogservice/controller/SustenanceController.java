package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.model.SustenanceHasIngredient;
import io.cobra.catalogservice.repository.SustenanceHasIngredientRepository;
import io.cobra.catalogservice.repository.SustenanceRepository;
import io.cobra.catalogservice.service.ImageService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.sql.Timestamp;
import java.util.List;

@RestController
public class SustenanceController {
    private final SustenanceRepository sustenanceRepository;
    private final SustenanceHasIngredientRepository sustenanceHasIngredientRepository;
    private final ImageService imageService;

    public SustenanceController(SustenanceRepository sustenanceRepository,
                                SustenanceHasIngredientRepository sustenanceHasIngredientRepository,
                                ImageService imageService) {
        this.sustenanceRepository = sustenanceRepository;
        this.sustenanceHasIngredientRepository = sustenanceHasIngredientRepository;
        this.imageService = imageService;
    }

    @GetMapping("/sustenance")
    public List<Sustenance> viewAllSustenance() {
        return this.sustenanceRepository.findAll();
    }

    @GetMapping("/sustenance/{id}")
    public Sustenance viewSustenanceById(@PathVariable("id") int id) {
        return this.sustenanceRepository.findById(id);
    }

    @GetMapping("/sustenance/{id}/ingredients")
    public List<SustenanceHasIngredient> viewIngredientsBySustenanceId(@PathVariable("id") int sustenanceId) {
        return this.sustenanceHasIngredientRepository.findBySustenanceId(sustenanceId);
    }

    @PostMapping(value = "/sustenance", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createSustenance(@RequestBody Sustenance sustenance, File image) {
        sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        sustenance.setImageId(this.imageService.generateImageId(image));
        this.sustenanceRepository.save(sustenance);
    }
}
