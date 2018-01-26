package org.proygrad.picasso.rest.api.scenario;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class ScenarioTO implements Serializable {

    private String id;
    private String type;
    private String unitSystem;
    private List< ParameterTO> parameters;
    private Map<String, ParameterTO> materials;
    private Map<String, Double> configuration;
    private Map<String, Object> output;


    public String getId() {
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

    public Map<String, ParameterTO> getMaterials() {
        return materials;
    }

    public void setMaterials(Map<String, ParameterTO> materials) {
        this.materials = materials;
    }

    public Map<String, Double> getConfiguration() {
        return configuration;
    }

    public void setConfiguration(Map<String, Double> configuration) {
        this.configuration = configuration;
    }

    public Map<String, Object> getOutput() {
        return output;
    }

    public void setOutput(Map<String, Object> output) {
        this.output = output;
    }
}
