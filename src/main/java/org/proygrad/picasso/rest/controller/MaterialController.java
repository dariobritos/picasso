package org.proygrad.picasso.rest.controller;

import org.proygrad.picasso.rest.api.material.MaterialTO;
import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.service.MaterialService;
import org.proygrad.picasso.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
public class MaterialController {

    @Autowired
    private MaterialService materialService;


    @RequestMapping(value = "/rest/material", method = RequestMethod.GET)
    public List<MaterialTO> materials(@RequestParam(value = "user_id", required = false) String userId,
                                      @RequestParam(value = "properties", required = false) List<String> properties) {
        return materialService.getMaterialsByUserIdOrProperties(userId, properties);
    }

    @RequestMapping(value = "/rest/material/{id}", method = RequestMethod.GET)
    public MaterialTO material(@PathVariable String id) {
        return materialService.getMaterial(id);
    }

    @RequestMapping(value = "/rest/material", method = RequestMethod.POST)
    public String addMaterial(@RequestBody MaterialTO data) {
        return materialService.addMaterial(data);
    }

    @RequestMapping(value = "/rest/material/{id}", method = RequestMethod.DELETE)
    public void deleteMaterial(@PathVariable String id) {
        materialService.deleteMaterial(id);
    }

}
