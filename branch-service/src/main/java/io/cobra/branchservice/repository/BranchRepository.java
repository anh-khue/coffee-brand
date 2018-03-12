package io.cobra.branchservice.repository;

import io.cobra.branchservice.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BranchRepository extends JpaRepository<Branch, Integer> {
    
    List<Branch> findAll();
}
