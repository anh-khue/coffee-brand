package io.cobra.branchservice.controller;

import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.service.BranchService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
public class BranchController {
    
    private final BranchService branchService;
    
    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }
    
    @GetMapping("/branches")
    public ResponseEntity<List<Branch>> getAll() {
        List<Branch> branches = branchService.getAll();
        if (branches.isEmpty()) {
            return status(OK).body(branches);
        }
        return status(NO_CONTENT).build();
    }
    
    @GetMapping("/branches/{id}")
    public ResponseEntity<Branch> getById(@PathVariable("id") String id) {
        Optional<Branch> optionalBranch = branchService.getById(Integer.parseInt(id));
        return optionalBranch.map(branch -> status(OK).body(branch))
                             .orElseGet(() -> status(NOT_FOUND).build());
    }
    
    @PostMapping(value = "/branches", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public void create(@RequestBody Branch branch) {
        branchService.create(branch);
    }
    
    @DeleteMapping("/branches/{id}")
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") String id) {
        branchService.delete(Integer.parseInt(id));
    }
}
