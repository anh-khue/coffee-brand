package io.cobra.branchservice.service;

import io.cobra.branchservice.exception.BranchNotFoundException;
import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.model.Rating;
import io.cobra.branchservice.repository.BranchRepository;
import io.cobra.branchservice.repository.RatingRepository;
import io.cobra.branchservice.service.googledrive.GoogleDriveService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class BranchService {
    
    private final BranchRepository branchRepository;
    private final RatingRepository ratingRepository;
    
    private final RatingService ratingService;
    private final GoogleDriveService googleDriveService;
    
    public BranchService(BranchRepository branchRepository,
                         RatingService ratingService,
                         RatingRepository ratingRepository, GoogleDriveService googleDriveService) {
        this.branchRepository = branchRepository;
        this.ratingService = ratingService;
        this.ratingRepository = ratingRepository;
        this.googleDriveService = googleDriveService;
    }
    
    public List<Branch> getAll() {
        return branchRepository.findAll();
    }
    
    public Optional<Branch> getById(Integer id) {
        return branchRepository.findById(id);
    }
    
    public int create(Branch branch) {
        try {
            String driveFolderId = googleDriveService.createFolder(branch.getName()
                                                                   + System.currentTimeMillis());
            branch.setDriveFolderId(driveFolderId);
            
            branchRepository.save(branch);
            branchRepository.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return branch.getId();
    }
    
    public void delete(Integer id) {
        branchRepository.deleteById(id);
    }
    
    public Double rate(Rating rating) throws BranchNotFoundException {
        Optional<Branch> optionalBranch = branchRepository.findById(rating.getBranchId());
        return optionalBranch.map(branch -> {
            ratingService.rate(rating.getBranchId(), rating.getCustomerId(), rating.getStar());
            updateRating(branch);
            return branch.getRating();
        }).orElseThrow(() -> new BranchNotFoundException(rating.getBranchId()));
    }
    
    public List<String> retrieveImagesById(Integer branchId) {
        try {
            Optional<Branch> optionalBranch = getById(branchId);
            if (optionalBranch.isPresent()) {
                Branch branch = optionalBranch.get();
                return googleDriveService.getChildFiles(branch.getDriveFolderId());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return new ArrayList<>();
    }
    
    public String uploadImage(MultipartFile multipartFile, Integer branchId)
            throws BranchNotFoundException,
                   IOException {
        
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        Branch branch = getById(branchId)
                                .orElseThrow(() -> new BranchNotFoundException(branchId));
        multipartFile.transferTo(file);
        return googleDriveService.uploadImage(file, branch.getDriveFolderId());
    }
    
    private void updateRating(Branch branch) {
        List<Rating> ratings = ratingRepository.findByBranchId(branch.getId());
        
        OptionalDouble newRating = ratings.stream()
                                          .mapToInt(Rating::getStar)
                                          .average();
        
        newRating.ifPresent(value -> {
            branch.setRating(value);
            branchRepository.save(branch);
            branchRepository.flush();
        });
    }
}