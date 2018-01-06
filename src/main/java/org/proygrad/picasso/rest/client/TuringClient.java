package org.proygrad.picasso.rest.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;


public class TuringClient {

    private static String GET_SCENARIOS = "http://turing/scenario";

    @Autowired
    private RestTemplate restTemplate;


    public ScenarioTO getScenario()    {
        String id = "id";
        return restTemplate.getForEntity(GET_SCENARIOS,ScenarioTO.class, id ).getBody();
    }




}
