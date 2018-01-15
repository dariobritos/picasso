package org.proygrad.picasso.rest.api.scenario;

public class ParameterTO {

    private Double value;
    private String type;
    private DistributionTO distribution;
    private String unit;

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

    public DistributionTO getDistribution() {
        return distribution;
    }

    public void setDistribution(DistributionTO distribution) {
        this.distribution = distribution;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
