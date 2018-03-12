package io.cobra.branchservice.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Time;
import java.util.Objects;

@Entity
public class Branch {
    
    private int id;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private Time openingHour;
    private Time closingHour;
    
    private String driveFolderId;
    private double rating;
    
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
    
    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    @Basic
    @Column(name = "latitude")
    public double getLatitude() {
        return latitude;
    }
    
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
    
    @Basic
    @Column(name = "longitude")
    public double getLongitude() {
        return longitude;
    }
    
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    
    @Basic
    @Column(name = "opening_hour")
    public Time getOpeningHour() {
        return openingHour;
    }
    
    public void setOpeningHour(Time openingHour) {
        this.openingHour = openingHour;
    }
    
    @Basic
    @Column(name = "closing_hour")
    public Time getClosingHour() {
        return closingHour;
    }
    
    public void setClosingHour(Time closingHour) {
        this.closingHour = closingHour;
    }
    
    @Basic
    @Column(name = "drive_folder_id")
    public String getDriveFolderId() {
        return driveFolderId;
    }
    
    public void setDriveFolderId(String driveFolderId) {
        this.driveFolderId = driveFolderId;
    }
    
    @Basic
    @Column(name = "rating")
    public double getRating() {
        return rating;
    }
    
    public void setRating(double rating) {
        this.rating = rating;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Branch branch = (Branch) o;
        return id == branch.id &&
               Double.compare(branch.latitude, latitude) == 0 &&
               Double.compare(branch.longitude, longitude) == 0 &&
               Double.compare(branch.rating, rating) == 0 &&
               Objects.equals(name, branch.name) &&
               Objects.equals(address, branch.address) &&
               Objects.equals(openingHour, branch.openingHour) &&
               Objects.equals(closingHour, branch.closingHour);
    }
    
    @Override
    public int hashCode() {
        
        return Objects.hash(id, name, address, latitude, longitude, openingHour, closingHour, rating);
    }
}
