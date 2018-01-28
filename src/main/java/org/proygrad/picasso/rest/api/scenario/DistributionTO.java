package org.proygrad.picasso.rest.api.scenario;

import java.util.List;

public class DistributionTO {

    private String type;
    private List<CommonItem> parameters;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<CommonItem> getParameters() {
        return parameters;
    }

    public void setParameters(List<CommonItem> parameters) {
        this.parameters = parameters;
    }
}
