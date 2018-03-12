package org.proygrad.picasso.app;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
//@EnableDiscoveryClient
@ComponentScan("org.proygrad.picasso")
public class PicassoApplication  {

	public static void main(String[] args) {
		SpringApplication.run(PicassoApplication.class, args);
	}


	protected void configure(HttpSecurity http) throws Exception {
		http
				.antMatcher("/**")
				.authorizeRequests()
				.antMatchers("/", "/login**", "/webjars/**","/**")//quitar el /* para que se active la seguridad
				.permitAll()
				.anyRequest()
				.authenticated().and()
				.csrf()/*TODO: estudiar esto cuando se trate el tema de seguridad*/
				.disable();
	}


	@Bean
	public ObjectMapper objectMapperBuilder() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return mapper;
	}
}
