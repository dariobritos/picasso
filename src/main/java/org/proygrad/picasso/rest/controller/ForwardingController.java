package org.proygrad.picasso.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {


	/***
	 * Esto se hace para que todas las direcciones de vistas Angular sean redirigidas al root, donde el mismo angular se encargara de renderizarlas
	 * @return
	 */
	@RequestMapping(value = {"/home","/dashboard","/scenarios","/scenario/*", "/new", "/new/*", "/profile","/signup", "/materials","/error/*"})
	public String forward() {
		return "forward:/";
	}



}
