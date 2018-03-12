package io.cobra.branchservice.service;

import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.model.Rating;
import io.cobra.branchservice.repository.BranchRepository;
import io.cobra.branchservice.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
public class BranchService {
    
    public static final Double BRANCH_NOT_PRESENT = -10.0;
    
    private final BranchRepository branchRepository;
    
    private final RatingService ratingService;
    private final RatingRepository ratingRepository;
    
    public BranchService(BranchRepository branchRepository,
                         RatingService ratingService,
                         RatingRepository ratingRepository) {
        this.branchRepository = branchRepository;
        this.ratingService = ratingService;
        this.ratingRepository = ratingRepository;
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
        Optional<Branch> optionalBranch = branchRepository.findById(rating.getBranchId());
        if (optionalBranch.isPresent()) {
            ratingService.rate(rating.getBranchId(), rating.getCustomerId(), rating.getStar());
            updateRating(optionalBranch.get());
            return optionalBranch.get().getRating();
        }
        
        return BRANCH_NOT_PRESENT;
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
