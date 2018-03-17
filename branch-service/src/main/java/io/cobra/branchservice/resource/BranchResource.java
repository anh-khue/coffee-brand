package io.cobra.branchservice.resource;

import io.cobra.branchservice.controller.BranchController;
import io.cobra.branchservice.model.Branch;
import org.springframework.hateoas.ResourceSupport;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

public class BranchResource extends ResourceSupport {
    
    private final Branch branch;
    
    public BranchResource(Branch branch) {
        this.branch = branch;
        
        final String id = String.valueOf(branch.getId());
        add(linkTo(methodOn(BranchController.class).getById(id)).withSelfRel());
        add(linkTo(methodOn(BranchController.class).getImagesById(id)).withRel("images_id"));
        add(linkTo(methodOn(BranchController.class).getAll()).withRel("all"));
    }
    
    public Branch getBranch() {
        return branch;
    }
}
