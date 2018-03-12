package io.cobra.branchservice.service;

import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.model.Rating;
import io.cobra.branchservice.repository.BranchRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {
    
    public static final Double BRANCH_NOT_PRESENT = -10.0;
    
    private final BranchRepository branchRepository;
    private final RatingService ratingService;
    
    public BranchService(BranchRepository branchRepository, RatingService ratingService) {
        this.branchRepository = branchRepository;
        this.ratingService = ratingService;
    }
    
    public List<Branch> getAll() {
        return branchRepository.findAll();
    }
    
    public Optional<Branch> getById(Integer id) {
        return branchRepository.findById(id);
    }
    
    public int create(Branch branch) {
        branchRepository.save(branch);
        branchRepository.flush();
        
        return branch.getId();
    }
    
    public void delete(Integer id) {
        branchRepository.deleteById(id);
    }
    
    public Double rate(Rating rating) {
        Optional<Branch> branch = branchRepository.findById(rating.getBranchId());
        if (branch.isPresent()) {
            Integer customerRating = ratingService.rate(rating.getBranchId(), rating.getCustomerId(), rating.getStar());
            Double newRating = (branch.get().getRating() + customerRating) / 2;
            branch.get().setRating(newRating);
            return newRating;
        }
        
        return BRANCH_NOT_PRESENT;
    }
}
