package org.proygrad.picasso.rest.api.scenario;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

public class ScenarioTO implements Serializable {

    private String id;
    private String type;
    private String unitSystem;
    private List<ParameterTO> parameters;
    private List<ConfigurationItemTO> configuration;
    private String comments;
    private List<CommonItem> output;

    //TODO: Borrar, es solo para pruebas
    private Integer age = 0;

    public String getId() {
        age++;
        //Si es mas viejo que 10, se le crea un output
        if (age > 15 && output == null) {

            output = Collections.singletonList(new CommonItem("FAILURE_PROBABILITY", Double.toString(Math.random())));
        }
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUnitSystem() {
        return unitSystem;
    }

    public void setUnitSystem(String unitSystem) {
        this.unitSystem = unitSystem;
    }

    public List<ParameterTO> getParameters() {
        return parameters;
    }

    public void setParameters(List<ParameterTO> parameters) {
        this.parameters = parameters;
    }

    public List<ConfigurationItemTO> getConfiguration() {
        return configuration;
    }

    public void setConfiguration(List<ConfigurationItemTO> configuration) {
        this.configuration = configuration;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public List<CommonItem> getOutput() {
        return output;
    }

    public void setOutput(List<CommonItem> output) {
        this.output = output;
    }
}
