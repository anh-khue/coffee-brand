package io.cobra.orderservice.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "orders")
public class Order {
    
    private int id;
    private Integer memberId;
    private int cashierId;
    private Double total;
    private Timestamp createdDate;
    private Timestamp checkoutDate;
    private int status;
    
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
    @Column(name = "member_id")
    public Integer getMemberId() {
        return memberId;
    }
    
    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }
    
    @Basic
    @Column(name = "cashier_id")
    public int getCashierId() {
        return cashierId;
    }
    
    public void setCashierId(int cashierId) {
        this.cashierId = cashierId;
    }
    
    @Basic
    @Column(name = "total")
    public Double getTotal() {
        return total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }
    
    @Basic
    @Column(name = "created_date")
    public Timestamp getCreatedDate() {
        return createdDate;
    }
    
    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }
    
    @Basic
    @Column(name = "checkout_date")
    public Timestamp getCheckoutDate() {
        return checkoutDate;
    }
    
    public void setCheckoutDate(Timestamp checkoutDate) {
        this.checkoutDate = checkoutDate;
    }
    
    @Basic
    @Column(name = "status")
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order that = (Order) o;
        return id == that.id &&
               cashierId == that.cashierId &&
               status == that.status &&
               Objects.equals(memberId, that.memberId) &&
               Objects.equals(total, that.total) &&
               Objects.equals(createdDate, that.createdDate) &&
               Objects.equals(checkoutDate, that.checkoutDate);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, memberId, cashierId, total, createdDate, checkoutDate, status);
    }
}
