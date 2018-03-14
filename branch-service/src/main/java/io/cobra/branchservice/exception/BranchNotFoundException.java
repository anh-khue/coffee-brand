package io.cobra.branchservice.exception;

public class BranchNotFoundException extends Exception {
    
    public BranchNotFoundException(Integer id) {
        super("No branch with id " + id + " found.");
    }
}
