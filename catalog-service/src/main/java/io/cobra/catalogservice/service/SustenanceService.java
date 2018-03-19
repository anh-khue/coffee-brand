package io.cobra.catalogservice.service;

import io.cobra.catalogservice.model.Sustenance;
import io.cobra.catalogservice.model.SustenanceHasIngredient;
import io.cobra.catalogservice.repository.SustenanceHasIngredientRepository;
import io.cobra.catalogservice.repository.SustenanceRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public void create(Sustenance sustenance, File image, List<Integer> ingredientIds) {
        if (!image.exists()) {
            sustenance.setImageId(DEFAULT_IMAGE_ID);
        } else {
            sustenance.setImageId(this.imageService.generateImageId(image));
        }
        sustenance.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        this.sustenanceRepository.save(sustenance);
        image.delete();
        if (null != ingredientIds && !ingredientIds.isEmpty()) {
            this.sustenanceRepository.flush();
            setIngredients(sustenance.getId(), ingredientIds);
        }
    }

    private void setIngredients(int sustenanceId, List<Integer> ingredientIds) {
        for (int ingredientId : ingredientIds) {
            this.sustenanceHasIngredientRepository.save(new SustenanceHasIngredient(ingredientId, sustenanceId));
        }
    }

    public File handleMultipartFile(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());
        if (!multipartFile.isEmpty()) {
            try {
                byte[] bytes = multipartFile.getBytes();
                FileUtils.writeByteArrayToFile(file, bytes);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return file;
    }

    public void updateSustenance(int sustenanceId, double price, double discount, MultipartFile image) {
        Sustenance sustenance = getById(sustenanceId);
        sustenance.setPrice(price);
        sustenance.setDiscount(discount);
        File imageFile = handleMultipartFile(image);
        if (imageFile.exists()) {
            sustenance.setImageId(this.imageService.generateImageId(imageFile));
        }
        this.sustenanceRepository.save(sustenance);
    }
}
