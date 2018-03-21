package io.cobra.catalogservice.model;

import javax.persistence.*;

@Entity
@Table(name = "sustenance_has_ingredient", schema = "catalog", catalog = "")
@IdClass(SustenanceHasIngredientPK.class)
public class SustenanceHasIngredient {
    private int ingredientId;
    private int sustenanceId;
    private Ingredient ingredientByIngredientId;

    public SustenanceHasIngredient() {
    }

    public SustenanceHasIngredient(int ingredientId, int sustenanceId) {
        this.ingredientId = ingredientId;
        this.sustenanceId = sustenanceId;
    }

    @Id
    @Column(name = "ingredient_id", nullable = false)
    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Id
    @Column(name = "sustenance_id", nullable = false)
    public int getSustenanceId() {
        return sustenanceId;
    }

    public void setSustenanceId(int sustenanceId) {
        this.sustenanceId = sustenanceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SustenanceHasIngredient that = (SustenanceHasIngredient) o;

        if (ingredientId != that.ingredientId) return false;
        if (sustenanceId != that.sustenanceId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = ingredientId;
        result = 31 * result + sustenanceId;
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "ingredient_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public Ingredient getIngredientByIngredientId() {
        return ingredientByIngredientId;
    }

    public void setIngredientByIngredientId(Ingredient ingredientByIngredientId) {
        this.ingredientByIngredientId = ingredientByIngredientId;
    }
}
