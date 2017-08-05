package org.proygrad.picasso.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan("org.proygrad.picasso")
public class PicassoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PicassoApplication.class, args);
	}
}
