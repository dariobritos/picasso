package org.proygrad.picasso.service;

import org.proygrad.picasso.rest.api.material.MaterialTO;
import org.proygrad.picasso.rest.client.TuringClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private TuringClient turingClient;

    public MaterialTO getMaterial(String id) {
        return turingClient.getMaterial(id);
    }

    public List<MaterialTO> getMaterialsByUserIdOrProperties(String userId, List<String> properties) {
        return turingClient.getMaterialsByUserIdOrProperties(userId, properties);
    }

    public String addMaterial(MaterialTO materialTO) {
        return turingClient.addMaterial(materialTO);
    }

    public void deleteMaterial(String id){
        turingClient.deleteMaterial(id);
    }
}

