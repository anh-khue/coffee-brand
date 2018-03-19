package io.cobra.authservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "roles", schema = "cobra_auth_db")
public class Role {
    
    private int id;
    private String name;
    
    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return id == role.id &&
               Objects.equals(name, role.name);
    }
    
    @Override
    public int hashCode() {
        
        return Objects.hash(id, name);
    }
}