package io.cobra.customerservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "levels", schema = "customer_service")
public class Level {
    private int id;
    private String name;
    private Double requiredPoint;
    private Double discountRate;

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
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "required_point")
    public Double getRequiredPoint() {
        return requiredPoint;
    }

    public void setRequiredPoint(Double requiredPoint) {
        this.requiredPoint = requiredPoint;
    }

    @Basic
    @Column(name = "discount_rate")
    public Double getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Double discountRate) {
        this.discountRate = discountRate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Level level = (Level) o;
        return id == level.id &&
               Objects.equals(name, level.name) &&
               Objects.equals(requiredPoint, level.requiredPoint) &&
               Objects.equals(discountRate, level.discountRate);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, requiredPoint, discountRate);
    }
}
