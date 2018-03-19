package io.cobra.authservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "accounts", schema = "cobra_auth_db")
public class Account {
    
    private int id;
    private String email;
    private String password;
    private Role role;
    
    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id &&
               Objects.equals(email, account.email) &&
               Objects.equals(password, account.password);
    }
    
    @Override
    public int hashCode() {
        
        return Objects.hash(id, email, password);
    }
    
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
}
