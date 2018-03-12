package io.cobra.branchservice.service;

import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.repository.BranchRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BranchService {
    
    private final BranchRepository branchRepository;
    
    public BranchService(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
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
}
