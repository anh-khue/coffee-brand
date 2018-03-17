package io.cobra.branchservice.controller;

import io.cobra.branchservice.exception.BranchNotFoundException;
import io.cobra.branchservice.model.Branch;
import io.cobra.branchservice.model.Rating;
import io.cobra.branchservice.resource.BranchResource;
import io.cobra.branchservice.service.BranchService;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/apis")
public class BranchController {
    
    private final BranchService branchService;
    
    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }
    
    @GetMapping(value = "/branches")
    public ResponseEntity<Resources<BranchResource>> getAll() {
        List<Branch> branches = branchService.getAll();
        List<BranchResource> branchResources = branches.stream().map(BranchResource::new).collect(Collectors.toList());
        Resources<BranchResource> resources = new Resources<>(branchResources);
        
        String selfUri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUriString();
        resources.add(new Link(selfUri, "self"));
        
        return !branches.isEmpty() ? status(OK).body(resources)
                                   : status(NO_CONTENT).build();
    }
    
    @PostMapping(value = "/branches", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity create(@RequestBody Branch branch) {
        return branchService.create(branch) > 0 ? status(ACCEPTED).build()
                                                : status(INTERNAL_SERVER_ERROR).build();
    }
    
    @GetMapping(value = "/branches/{id}")
    public ResponseEntity<BranchResource> getById(@PathVariable("id") String id) {
        return branchService.getById(Integer.parseInt(id))
                            .map(branch -> status(OK).body(new BranchResource(branch)))
                            .orElseGet(status(NOT_FOUND)::build);
    }
    
    @DeleteMapping("/branches/{id}")
    @ResponseStatus(ACCEPTED)
    public void delete(@PathVariable("id") String id) {
        branchService.delete(Integer.parseInt(id));
    }
    
    @PutMapping(value = "/branches/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Double> rate(@PathVariable("id") String id, @RequestBody Rating rating) {
        if (Integer.parseInt(id) == rating.getBranchId()) {
            try {
                Double newRating = branchService.rate(rating);
                return ResponseEntity.status(ACCEPTED).body(newRating);
            } catch (BranchNotFoundException e) {
                return ResponseEntity.status(NOT_FOUND).build();
            }
        }
        return ResponseEntity.status(CONFLICT).build();
    }
    
    @GetMapping(value = "/branches/{id}/images")
    public ResponseEntity<List<String>> getImagesById(@PathVariable("id") String id) {
        List<String> idList = branchService.retrieveImagesById(Integer.parseInt(id));
        return !idList.isEmpty() ? status(OK).body(idList)
                                 : status(NO_CONTENT).build();
    }
    
    @PostMapping(value = "/branches/{id}/images")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
                                         @PathVariable("id") String id) {
        try {
            String uploadImageId = branchService.uploadImage(file, Integer.parseInt(id));
            return ResponseEntity.status(CREATED).body(uploadImageId);
        } catch (BranchNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).build();
        } catch (IOException e) {
            return ResponseEntity.status(PRECONDITION_FAILED).build();
        }
    }
    
}
