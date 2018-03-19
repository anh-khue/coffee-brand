package io.cobra.authservice.exception;

public class InvalidSignInException extends Exception {
    
    public InvalidSignInException() {
        super("Wrong Email or Password");
    }
}
