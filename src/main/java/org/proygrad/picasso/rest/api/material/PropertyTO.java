package org.proygrad.picasso.rest.api.material;

public class PropertyTO {

    private String code;
    private Double value;
    private String unit;
    private String type;
    private PropertyDistributionTO distribution;
    private String magnitude;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public PropertyDistributionTO getDistribution() {
        return distribution;
    }

    public void setDistribution(PropertyDistributionTO distribution) {
        this.distribution = distribution;
    }

    public String getMagnitude() {
        return magnitude;
    }

    public void setMagnitude(String magnitude) {
        this.magnitude = magnitude;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
