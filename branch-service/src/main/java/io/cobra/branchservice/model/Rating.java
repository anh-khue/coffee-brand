package io.cobra.branchservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Rating {
    
    private int id;
    private int branchId;
    private int customerId;
    private int star;
    
    public Rating() {
    }
    
    public Rating(int branchId, int customerId, int star) {
        this.branchId = branchId;
        this.customerId = customerId;
        this.star = star;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    @Basic
    @Column(name = "branch_id")
    public int getBranchId() {
        return branchId;
    }
    
    public void setBranchId(int branchId) {
        this.branchId = branchId;
    }
    
    @Basic
    @Column(name = "customer_id")
    public int getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    
    @Basic
    @Column(name = "star")
    public int getStar() {
        return star;
    }
    
    public void setStar(int star) {
        this.star = star;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rating rating = (Rating) o;
        return id == rating.id &&
               branchId == rating.branchId &&
               customerId == rating.customerId &&
               star == rating.star;
    }
    
    @Override
    public int hashCode() {
        
        return Objects.hash(id, branchId, customerId, star);
    }
}
