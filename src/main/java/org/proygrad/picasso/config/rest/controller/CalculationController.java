package org.proygrad.picasso.config.rest.controller;

import org.proygrad.picasso.config.rest.client.Calculation;
import org.proygrad.picasso.config.rest.client.TuringClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculationController {


    @Autowired
    private TuringClient turingClient;

    @RequestMapping(value = "/calculation", method = RequestMethod.GET)
    public Calculation calculation() {

        return turingClient.getCalculation();
    }
}
