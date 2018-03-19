package io.cobra.catalogservice.controller;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.model.SustenanceHasIngredient;
import io.cobra.catalogservice.service.SustenanceService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
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
    public void createSustenance(@RequestBody Sustenance sustenance,
                                 @RequestParam("file") MultipartFile image,
                                 @RequestParam("ingredientIds") List<Integer> ingredientIds) {
        this.sustenanceService.create(sustenance, this.sustenanceService.handleMultipartFile(image), ingredientIds);
    }

    @GetMapping("types/{id}/sustenance")
    public List<Sustenance> viewSustenanceByTypeId(@PathVariable("id") int typeId) {
        return this.sustenanceService.getByTypeId(typeId);
    }

    @PostMapping(value = "/sustenance/{id}")
    public void modifySustenance(@PathVariable("id") int sustenanceId,
                                 @RequestParam("price") double price,
                                 @RequestParam("discount") double discount,
                                 @RequestParam("file") MultipartFile image) {
        this.sustenanceService.updateSustenance(sustenanceId, price, discount, image);
    }
}
