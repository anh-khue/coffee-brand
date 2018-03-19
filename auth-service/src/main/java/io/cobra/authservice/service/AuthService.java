package io.cobra.authservice.service;

import io.cobra.authservice.exception.InvalidSignInException;
import io.cobra.authservice.model.Account;
import io.cobra.authservice.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final AccountRepository accountRepository;
    
    public AuthService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    
    public Account signIn(String email, String password) throws InvalidSignInException {
        return accountRepository.findByEmailAndPassword(email, password)
                .orElseThrow(InvalidSignInException::new);
    }
}
