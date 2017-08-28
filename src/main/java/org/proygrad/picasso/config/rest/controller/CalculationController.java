package org.proygrad.picasso.config.rest.controller;

import org.proygrad.picasso.config.rest.client.CalculationTO;
import org.proygrad.picasso.config.rest.client.TuringClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.LinkedList;
import java.util.List;
import java.util.OptionalLong;

@RestController(value = "/service")
public class CalculationController {


    @Autowired
    private TuringClient turingClient;

    private List<CalculationTO> calclulations;


    @PostConstruct
    private void init() {
        calclulations = new LinkedList<CalculationTO>();
        calclulations.add(new CalculationTO(1L, "Zero"));
        calclulations.add(new CalculationTO(2L, "Mr. Nice"));
        calclulations.add(new CalculationTO(3L, "Narco"));
        calclulations.add(new CalculationTO(4L, "Bombasto"));
        calclulations.add(new CalculationTO(5L, "Dario"));
    }

    @RequestMapping(value = "/service/calculation", method = RequestMethod.GET)
    public List<CalculationTO> calculations() {

        return calclulations;
    }


    @RequestMapping(value = "/service/calculation/{id}", method = RequestMethod.GET)
    public CalculationTO calculation(@PathVariable final Long id) {

        return calclulations.stream().filter(x -> x.getId().equals(id)).findAny().orElseGet(null);
    }

    @RequestMapping(value = "/service/calculation/{id}", method = RequestMethod.PUT)
    public CalculationTO updateCalculation(@PathVariable final Long id, @RequestBody CalculationTO calculation) {

        CalculationTO calculationTO = calclulations.stream().filter(x -> x.getId().equals(id)).findAny().orElseGet(null);
        calculationTO.setName(calculation.getName());

        return calculationTO;
    }

    @RequestMapping(value = "/service/calculation", method = RequestMethod.POST)
    public CalculationTO addCalculation(@RequestBody CalculationTO data) {

        OptionalLong max = calculations().stream().mapToLong(CalculationTO::getId).max();

        CalculationTO newCalc = new CalculationTO(max.getAsLong()+1, data.getName());

        calclulations.add(newCalc);

        return newCalc;
    }
}
