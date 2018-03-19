package io.cobra.authservice.repository;

import io.cobra.authservice.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    
}
