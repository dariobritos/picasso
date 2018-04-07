package org.proygrad.picasso.rest.api.material;

import java.util.List;

public class PropertyDistributionTO {

    private String id;
    private String type;
    private List<ParameterDistributionTO> parameters;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<ParameterDistributionTO> getParameters() {
        return parameters;
    }

    public void setParameters(List<ParameterDistributionTO> parameters) {
        this.parameters = parameters;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
