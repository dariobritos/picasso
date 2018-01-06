package org.proygrad.picasso.rest.controller;

import org.proygrad.picasso.rest.client.ScenarioTO;
import org.proygrad.picasso.rest.client.TuringClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.LinkedList;
import java.util.List;
import java.util.OptionalLong;

@RestController(value = "/service")
public class ScenarioController {


    @Autowired
    private TuringClient turingClient;

    private List<ScenarioTO> calclulations;


    @PostConstruct
    private void init() {
        calclulations = new LinkedList<ScenarioTO>();
        calclulations.add(new ScenarioTO(1L, "Zero"));
        calclulations.add(new ScenarioTO(2L, "Mr. Nice"));
        calclulations.add(new ScenarioTO(3L, "Narco"));
        calclulations.add(new ScenarioTO(4L, "Bombasto"));
        calclulations.add(new ScenarioTO(5L, "Dario"));
    }

    @RequestMapping(value = "/scenario", method = RequestMethod.GET)
    public List<ScenarioTO> scenarios() {

        return calclulations;
    }


    @RequestMapping(value = "/scenario/{id}", method = RequestMethod.GET)
    public ScenarioTO scenario(@PathVariable final Long id) {

        return calclulations.stream().filter(x -> x.getId().equals(id)).findAny().orElseGet(null);
    }

    @RequestMapping(value = "/scenario/{id}", method = RequestMethod.PUT)
    public ScenarioTO updateScenario(@PathVariable final Long id, @RequestBody ScenarioTO scenario) {

        ScenarioTO scenarioTO = calclulations.stream().filter(x -> x.getId().equals(id)).findAny().orElseGet(null);
        scenarioTO.setName(scenario.getName());

        return scenarioTO;
    }

    @RequestMapping(value = "/scenario", method = RequestMethod.POST)
    public ScenarioTO addScenario(@RequestBody ScenarioTO data) {

        OptionalLong max = scenarios().stream().mapToLong(ScenarioTO::getId).max();

        ScenarioTO newCalc = new ScenarioTO(max.getAsLong()+1, data.getName());

        calclulations.add(newCalc);

        return newCalc;
    }
}
