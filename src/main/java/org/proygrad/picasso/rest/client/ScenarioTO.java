package org.proygrad.picasso.rest.client;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;

public class ScenarioTO implements Serializable {

    private Long id;
    private String name;
    private String type;

    private Map<String, Double> input;
    private BigDecimal seed;

    private String precision;

    private String result;
    private Map<String, Double> output;

    public ScenarioTO() {
    }

    public ScenarioTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Double> getInput() {
        return input;
    }

    public void setInput(Map<String, Double> input) {
        this.input = input;
    }

    public BigDecimal getSeed() {
        return seed;
    }

    public void setSeed(BigDecimal seed) {
        this.seed = seed;
    }

    public String getPrecision() {
        return precision;
    }

    public void setPrecision(String precision) {
        this.precision = precision;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Map<String, Double> getOutput() {
        return output;
    }

    public void setOutput(Map<String, Double> output) {
        this.output = output;
    }
}
