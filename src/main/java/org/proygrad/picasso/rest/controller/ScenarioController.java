package org.proygrad.picasso.rest.controller;


import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class ScenarioController {


    @Autowired
    private ScenarioService scenarioService;


    @RequestMapping(value = "/rest/scenario", method = RequestMethod.GET)
    public List<ScenarioTO> scenarios() {
        return scenarioService.getScenarios();
    }


    @RequestMapping(value = "/rest/scenario/{id}", method = RequestMethod.GET)
    public ScenarioTO scenario(@PathVariable String id) {
        return scenarioService.getScenario(id);
    }

    @RequestMapping(value = "/rest/scenario/{id}", method = RequestMethod.PUT)
    public ScenarioTO updateScenario(@PathVariable String id, @RequestBody ScenarioTO scenario) {
        scenarioService.updateScenario(id,scenario);
        return scenarioService.getScenario(id);
    }

    @RequestMapping(value = "/rest/scenario", method = RequestMethod.POST)
    public String addScenario(@RequestBody ScenarioTO data) {
        return scenarioService.addScenario(data);
    }
}
