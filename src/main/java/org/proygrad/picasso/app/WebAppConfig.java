package org.proygrad.picasso.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebAppConfig  {



	@RequestMapping(value = "/home")
	public String redirect3() {
		System.out.println("redirect home");
		return "forward:/";
	}

	@RequestMapping(value = "/dashboard")
	public String redirectdashboard() {
		System.out.println("redirect dashboard");
		return "forward:/";
	}

	@RequestMapping(value = {"/calculations","/calculation/*"})
	public String redirect() {
		System.out.println("redirect 1");
		return "forward:/";
	}



}
