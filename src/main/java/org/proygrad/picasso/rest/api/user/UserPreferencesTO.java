package org.proygrad.picasso.rest.api.user;

public class UserPreferencesTO {

    private String unitSystem;
    private String language;
    private String fastScenario;

    public String getUnitSystem() {
        return unitSystem;
    }

    public void setUnitSystem(String unitSystem) {
        this.unitSystem = unitSystem;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getFastScenario() {
        return fastScenario;
    }

    public void setFastScenario(String fastScenario) {
        this.fastScenario = fastScenario;
    }
}
