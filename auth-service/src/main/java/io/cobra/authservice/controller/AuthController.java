package io.cobra.authservice.controller;

import io.cobra.authservice.exception.InvalidSignInException;
import io.cobra.authservice.request.SignInCustomRequest;
import io.cobra.authservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.status;

@RestController
@CrossOrigin
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("signin")
    public ResponseEntity signIn(@RequestBody SignInCustomRequest request) {
        try {
            return status(OK).body(authService.signIn(request.getEmail(), request.getPassword()));
        } catch (InvalidSignInException e) {
            return status(NOT_FOUND).body(e.getMessage());
        }
    }
}
