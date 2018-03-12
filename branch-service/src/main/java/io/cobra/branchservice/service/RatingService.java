package io.cobra.branchservice.service;

import io.cobra.branchservice.model.Rating;
import io.cobra.branchservice.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingService {
    
    private final RatingRepository ratingRepository;
    
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }
    
    private Optional<Rating> getByBranchIdAndCustomerId(Integer branchId, Integer customerId) {
        return ratingRepository.findByBranchIdAndAndCustomerId(branchId, customerId);
    }
    
    Integer rate(Integer branchId, Integer customerId, Integer star) {
        Optional<Rating> optionalRating = getByBranchIdAndCustomerId(branchId, customerId);
        if (optionalRating.isPresent()) {
            return update(optionalRating.get(), star);
        }
        Rating rating = new Rating(branchId, customerId, star);
        return create(rating);
    }
    
    private Integer update(Rating rating, Integer star) {
        rating.setStar(star);
        ratingRepository.save(rating);
        return rating.getStar();
    }
    
    private Integer create(Rating rating) {
        ratingRepository.save(rating);
        return rating.getStar();
    }
}
