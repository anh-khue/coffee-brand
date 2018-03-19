package io.cobra.authservice.repository;

import io.cobra.authservice.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    
    Optional<Account> findByEmailAndPassword(String email, String password);
}
