package io.cobra.branchservice.controller;

import io.cobra.branchservice.constant.BranchConstants;
import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.model.Rating;
import io.cobra.branchservice.service.BranchService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static io.cobra.branchservice.constant.BranchConstants.*;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
public class BranchController {
    
    private final BranchService branchService;
    
    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }
    
    @GetMapping(value = "/branches")
    public ResponseEntity<List<Branch>> getAll() {
        List<Branch> branches = branchService.getAll();
        if (!branches.isEmpty()) {
            return status(OK).body(branches);
        }
        return status(NO_CONTENT).build();
    }
    
    @GetMapping(value = "/branches/{id}")
    public ResponseEntity<Branch> getById(@PathVariable("id") String id) {
        Optional<Branch> optionalBranch = branchService.getById(Integer.parseInt(id));
        return optionalBranch.map(status(OK)::body)
                             .orElseGet(status(NOT_FOUND)::build);
    }
    
    @PostMapping(value = "/branches", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity create(@RequestBody Branch branch) {
        if (branchService.create(branch) > 0) {
            return status(ACCEPTED).build();
        }
        return status(INTERNAL_SERVER_ERROR).build();
    }
    
    @DeleteMapping("/branches/{id}")
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") String id) {
        branchService.delete(Integer.parseInt(id));
    }
    
    @PutMapping(value = "/branches/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Double> rate(@PathVariable("id") String id, @RequestBody Rating rating) {
        if (Integer.parseInt(id) == rating.getBranchId()) {
            Double newRating = branchService.rate(rating);
            if (newRating.equals(BRANCH_NOT_EXIST)) {
                return ResponseEntity.status(NOT_FOUND).build();
            }
            return ResponseEntity.status(ACCEPTED).body(newRating);
        }
        return ResponseEntity.status(CONFLICT).build();
    }
}
