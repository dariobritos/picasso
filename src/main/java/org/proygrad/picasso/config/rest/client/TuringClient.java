package org.proygrad.picasso.config.rest.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;


public class TuringClient {

    private static String GET_CALCULATIONS = "http://turing/calculation";

    @Autowired
    private RestTemplate restTemplate;


    public CalculationTO getCalculation()    {
        String id = "id";
        return restTemplate.getForEntity(GET_CALCULATIONS,CalculationTO.class, id ).getBody();
    }




}
