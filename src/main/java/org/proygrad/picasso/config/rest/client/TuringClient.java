package org.proygrad.picasso.config.rest.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.xml.ws.Response;


public class TuringClient {

    private static String GET_CALCULATIONS = "http://turing/calculation";

    @Autowired
    private RestTemplate restTemplate;


    public Calculation getCalculation()    {
        String id = "id";
        return restTemplate.getForEntity(GET_CALCULATIONS,Calculation.class, id ).getBody();
    }




}
