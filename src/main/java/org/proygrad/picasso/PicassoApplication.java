package org.proygrad.picasso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PicassoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PicassoApplication.class, args);
	}
}
