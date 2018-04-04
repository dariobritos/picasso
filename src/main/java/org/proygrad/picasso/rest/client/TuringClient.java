package org.proygrad.picasso.rest.client;

import org.apache.log4j.Logger;
import org.proygrad.picasso.rest.api.material.MaterialTO;
import org.proygrad.picasso.rest.api.material.ParameterDistributionTO;
import org.proygrad.picasso.rest.api.material.PropertyDistributionTO;
import org.proygrad.picasso.rest.api.material.PropertyTO;
import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.rest.api.user.UserTO;
import org.proygrad.picasso.rest.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class TuringClient {

    private final static String TURING_HOST = "http://localhost:9040/";

    private final static String SCENARIO_PATH = "scenario/";
    private final static String SCENARIO_USER_PATH = "scenario?user_id=";

    private final static String USER_PATH = "user/";
    private final static String USER_BY_EMAIL_PATH = "user?email=";

    private final static String MATERIAL_PATH = "material";
    private final static String MATERIAL_BY_USER_ID_PATH = "?user_id=";
    private final static String MATERIAL_BY_PROPERTIES_PATH = "?properties=";

    @Autowired
    private RestTemplate restTemplate;

    private static final Logger LOGGER = Logger.getLogger(TuringClient.class);

    public ScenarioTO getScenario(String id) {
        ScenarioTO scenario = restTemplate.getForEntity(TURING_HOST + SCENARIO_PATH + id, ScenarioTO.class, id).getBody();
        if(scenario==null){
            throw new NotFoundException();
        }
        return scenario;
    }


    public List<ScenarioTO> getScenarios(String userId) {
        // Recordar que esta limitado a los ultimos 10
        ResponseEntity<ScenarioTO[]> responseEntity = restTemplate.getForEntity(TURING_HOST + SCENARIO_USER_PATH+userId, ScenarioTO[].class);
        ScenarioTO[] objects = responseEntity.getBody();

        return new ArrayList(Arrays.asList(objects));
    }

    public String addScenario(ScenarioTO scenario) {
        LOGGER.info("Adding scenario...");
        String id = restTemplate.postForEntity(TURING_HOST + SCENARIO_PATH, scenario, String.class).getBody();
        LOGGER.info("Scenario added: " + id);
        return id;
    }


    public UserTO getUser(String id) {
        return restTemplate.getForEntity(TURING_HOST + USER_PATH + id, UserTO.class, id).getBody();
    }

    public String updateUser(String id, UserTO user) {
        return restTemplate.patchForObject(TURING_HOST + USER_PATH + id, (Object) user, String.class);
    }

    public String addUser(UserTO user) {
        LOGGER.info("User added " + user.getEmail() + " " + user.getPassword());
        return restTemplate.postForEntity(TURING_HOST + USER_PATH, user, String.class).getBody();
    }

    public UserTO findByUsername(String username) {
        return restTemplate.getForEntity(TURING_HOST + USER_BY_EMAIL_PATH + username, UserTO.class).getBody();

    }

    public String addMaterial(MaterialTO material){
        LOGGER.info("Material added " + material.getDescription() + " for " + material.getUserId());

        return "material_1_mock";
        /*TODO: A probar
        return restTemplate.postForEntity(TURING_HOST + MATERIAL_PATH, material, String.class).getBody();
        */
    }

    public List<MaterialTO> getMaterialsByUserIdOrProperties(String userId, List<String> properties) {

        return this.getMockMaterials();

        /* TODO: completar y ajustar segun usuario y propiedades q se envien
        ResponseEntity<MaterialTO[]> responseEntity = restTemplate.getForEntity(MATERIAL_PATH + MATERIAL_BY_USER_ID_PATH + userId, MaterialTO[].class);
        MaterialTO[] objects = responseEntity.getBody();

        return new ArrayList(Arrays.asList(objects));
*/
    }

    public MaterialTO getMaterial(String materialId) {
        return this.giveMaterialMock(materialId);
        /*TODO: A probar
        return restTemplate.getForEntity(TURING_HOST + MATERIAL_PATH+ "/" + materialId, MaterialTO.class, materialId).getBody();
        */
    }

    private List<MaterialTO> getMockMaterials(){

        List<MaterialTO> mockMaterials = new ArrayList<MaterialTO>();

        mockMaterials.add(giveMaterialMock("1"));
        mockMaterials.add(giveMaterialMock("2"));
        mockMaterials.add(giveMaterialMock("3"));
        mockMaterials.add(giveMaterialMock("4"));

        return mockMaterials;
    }

    private MaterialTO giveMaterialMock(String id){
        List<PropertyTO> mockPropertiesTO = new ArrayList<PropertyTO>();

        List<ParameterDistributionTO> parameters = new ArrayList<ParameterDistributionTO>();

        ParameterDistributionTO parameterDistribution_1 = new ParameterDistributionTO();
        parameterDistribution_1.setId("PARAMETER_DISTRIBUTION_"+id+"_ID");
        parameterDistribution_1.setCode("PARAMETER_DISTRIBUTION_"+id+"_CODE");
        parameterDistribution_1.setValue("VALUE");
        parameters.add(parameterDistribution_1);

        PropertyDistributionTO propertyDistribution_1 = new PropertyDistributionTO();
        propertyDistribution_1.setId("PROPERTY_DISTRIBUTION_"+id);
        propertyDistribution_1.setType("VARIABLE");
        propertyDistribution_1.setParameters(parameters);

        PropertyTO property_1 = new PropertyTO();
        property_1.setId("PROPERTY_"+id);
        property_1.setCode("CODE_PROPERTY_"+id);
        property_1.setDistribution(propertyDistribution_1);
        property_1.setMagnitude("MAGNITUDE");
        property_1.setType("VARIABLE");
        property_1.setUnit("CMS");
        property_1.setValue(1.0d);

        mockPropertiesTO.add(property_1);

        MaterialTO mockMaterial_1 = new MaterialTO();
        mockMaterial_1.setId("MATERIAL_"+id);
        mockMaterial_1.setDescription("desc material_"+id);
        mockMaterial_1.setProperties(mockPropertiesTO);
        mockMaterial_1.setUserId("USER_PEPEITO_ID");

        return mockMaterial_1;
    }

}
