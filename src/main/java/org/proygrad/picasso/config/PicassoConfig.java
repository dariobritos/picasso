package org.proygrad.picasso.config;

import org.proygrad.picasso.rest.client.TuringClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PicassoConfig {

    @Bean
    TuringClient turingClient(){
        return new TuringClient();
    }

}
