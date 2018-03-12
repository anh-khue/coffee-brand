package io.cobra.catalogservice.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
public class Sustenance {
    private int id;
    private String name;
    private double price;
    private double discount;
    private int unit;
    private Timestamp createdDate;
    private Timestamp modifiedDate;
    private String imageId;
//    private Collection<SustenanceHasIngredient> ingredientHasSustenanceById;
    private Type typeByTypeId;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "price", nullable = false, precision = 0)
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Basic
    @Column(name = "discount", nullable = false, precision = 0)
    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    @Basic
    @Column(name = "unit", nullable = false)
    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        this.unit = unit;
    }

    @Basic
    @Column(name = "created_date", nullable = true)
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    @Basic
    @Column(name = "modified_date", nullable = true)
    public Timestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Timestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    @Basic
    @Column(name = "image_id", nullable = true, length = 45)
    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Sustenance that = (Sustenance) o;

        if (id != that.id) return false;
        if (Double.compare(that.price, price) != 0) return false;
        if (Double.compare(that.discount, discount) != 0) return false;
        if (unit != that.unit) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (createdDate != null ? !createdDate.equals(that.createdDate) : that.createdDate != null) return false;
        if (modifiedDate != null ? !modifiedDate.equals(that.modifiedDate) : that.modifiedDate != null) return false;
        if (imageId != null ? !imageId.equals(that.imageId) : that.imageId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        temp = Double.doubleToLongBits(price);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(discount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + unit;
        result = 31 * result + (createdDate != null ? createdDate.hashCode() : 0);
        result = 31 * result + (modifiedDate != null ? modifiedDate.hashCode() : 0);
        result = 31 * result + (imageId != null ? imageId.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "sustenanceBySustenanceId")
//    public Collection<SustenanceHasIngredient> getIngredientHasSustenanceById() {
//        return ingredientHasSustenanceById;
//    }

//    public void setIngredientHasSustenanceById(Collection<SustenanceHasIngredient> ingredientHasSustenanceById) {
//        this.ingredientHasSustenanceById = ingredientHasSustenanceById;
//    }

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public Type getTypeByTypeId() {
        return typeByTypeId;
    }

    public void setTypeByTypeId(Type typeByTypeId) {
        this.typeByTypeId = typeByTypeId;
    }
}
