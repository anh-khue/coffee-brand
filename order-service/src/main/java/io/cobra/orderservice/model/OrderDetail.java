package io.cobra.orderservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "order_detail", schema = "Order_Coffee_Brand")
public class OrderDetail {
    private int id;
    private int orderId;
    private int sustenanceId;
    private double price;
    private int quantity;
    private Double discountRate;
    private double total;

    private double memberDiscountRate;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "order_id")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "sustenance_id")
    public int getSustenanceId() {
        return sustenanceId;
    }

    public void setSustenanceId(int sustenanceId) {
        this.sustenanceId = sustenanceId;
    }

    @Basic
    @Column(name = "price")
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Basic
    @Column(name = "quantity")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Basic
    @Column(name = "discount_rate")
    public Double getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Double discountRate) {
        this.discountRate = discountRate;
    }

    @Basic
    @Column(name = "total")
    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetail that = (OrderDetail) o;
        return id == that.id &&
                orderId == that.orderId &&
                sustenanceId == that.sustenanceId &&
                Double.compare(that.price, price) == 0 &&
                quantity == that.quantity &&
                Double.compare(that.total, total) == 0 &&
                Objects.equals(discountRate, that.discountRate);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, orderId, sustenanceId, price, quantity, discountRate, memberDiscountRate, total);
    }

    @Basic
    @Column(name = "member_discount_rate")
    public Double getMemberDiscountRate() {
        return memberDiscountRate;
    }

    public void setMemberDiscountRate(Double memberDiscountRate) {
        this.memberDiscountRate = memberDiscountRate;
    }
}
