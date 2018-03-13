package io.cobra.catalogservice.service;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.model.SustenanceHasIngredient;
import io.cobra.catalogservice.repository.SustenanceHasIngredientRepository;
import io.cobra.catalogservice.repository.SustenanceRepository;
import io.cobra.catalogservice.repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.Timestamp;
import java.util.List;

@Service
public class SustenanceService {
    private static final String DEFAULT_IMAGE_ID = "1YUXMKALEWNtEV1ek2K5TY5lAFDVt1R5m";

    private final SustenanceRepository sustenanceRepository;
    private final SustenanceHasIngredientRepository sustenanceHasIngredientRepository;

    private final ImageService imageService;

    public SustenanceService(SustenanceRepository sustenanceRepository,
                             SustenanceHasIngredientRepository sustenanceHasIngredientRepository,
                             ImageService imageService) {
        this.sustenanceRepository = sustenanceRepository;
        this.sustenanceHasIngredientRepository = sustenanceHasIngredientRepository;
        this.imageService = imageService;
    }

    public List<Sustenance> getAll() {
        return this.sustenanceRepository.findAll();
    }

    public Sustenance getById(int id) {
        return this.sustenanceRepository.findById(id);
    }

    public List<SustenanceHasIngredient> getContainedIngredients(int sustenanceId) {
        return this.sustenanceHasIngredientRepository.findBySustenanceId(sustenanceId);
    }

    public List<Sustenance> getByTypeId(int typeId) {
        return this.sustenanceRepository.findByTypeId(typeId);
    }

    public void create(Sustenance sustenance, File image) {
        if (!image.exists() || image.length() == 0) {
            sustenance.setImageId(DEFAULT_IMAGE_ID);
        } else {
            sustenance.setImageId(this.imageService.generateImageId(image));
        }
        sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        this.sustenanceRepository.save(sustenance);
    }
}
