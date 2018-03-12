package io.cobra.catalogservice.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class SustenanceHasIngredientPK implements Serializable {
    private int ingredientId;
    private int sustenanceId;

    @Column(name = "ingredient_id", nullable = false)
    @Id
    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Column(name = "sustenance_id", nullable = false)
    @Id
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

        SustenanceHasIngredientPK that = (SustenanceHasIngredientPK) o;

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
}
