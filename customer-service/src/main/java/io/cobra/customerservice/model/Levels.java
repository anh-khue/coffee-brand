package io.cobra.customerservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Levels {
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
        Levels levels = (Levels) o;
        return id == levels.id &&
                Objects.equals(name, levels.name) &&
                Objects.equals(requiredPoint, levels.requiredPoint) &&
                Objects.equals(discountRate, levels.discountRate);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, requiredPoint, discountRate);
    }
}
