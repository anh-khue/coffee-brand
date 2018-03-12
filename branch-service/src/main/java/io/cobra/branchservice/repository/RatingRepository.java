package io.cobra.branchservice.repository;

import io.cobra.branchservice.model.Rating;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends CrudRepository<Rating, Integer> {
    
}
