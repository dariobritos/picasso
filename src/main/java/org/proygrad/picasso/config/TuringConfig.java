package org.proygrad.picasso.config;

import org.proygrad.picasso.config.rest.client.TuringClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class TuringConfig {

    @Bean
    @LoadBalanced
    RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    TuringClient turingClient(){
        return new TuringClient();
    }

}
