package org.proygrad.picasso.service;

import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.rest.client.TuringClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScenarioService {

    @Autowired
    private TuringClient turingClient;


    public ScenarioTO getScenario(String id)    {
        return turingClient.getScenario(id);
    }


    public List<ScenarioTO> getScenarios() {
        return turingClient.getScenarios();
    }


    public void updateScenario(String id, ScenarioTO scenario) {
        turingClient.updateScenario(id,scenario);
    }

    public String addScenario(ScenarioTO scenario) {
        return turingClient.addScenario(scenario);
    }



}
