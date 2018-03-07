package org.proygrad.picasso.rest.client;

import org.apache.log4j.Logger;
import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.rest.api.user.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TuringClient {

    private final static String TURING_HOST = "http://localhost:9040/";

    private final static String SCENARIO_PATH = "scenario/";
    private final static String SCENARIO_USER_PATH = "scenario?user_id={}";

    private final static String USER_PATH = "user/";
    private final static String USER_BY_EMAIL_PATH = "user?email={}";

    @Autowired
    private RestTemplate restTemplate;

    private static final Logger LOGGER = Logger.getLogger(TuringClient.class);

    public ScenarioTO getScenario(String id) {
        return restTemplate.getForEntity(TURING_HOST + SCENARIO_PATH + id, ScenarioTO.class, id).getBody();
    }


    public List<ScenarioTO> getScenarios(String userId) {
        // Recordar que esta limitado a los ultimos 10
        ResponseEntity<ScenarioTO[]> responseEntity = restTemplate.getForEntity(TURING_HOST + SCENARIO_USER_PATH, ScenarioTO[].class, userId);
        ScenarioTO[] objects = responseEntity.getBody();

        return new ArrayList(Arrays.asList(objects));
    }

    public String addScenario(ScenarioTO scenario) {
        return restTemplate.postForEntity(TURING_HOST + SCENARIO_PATH, scenario, String.class).getBody();
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
        return restTemplate.getForEntity(TURING_HOST + USER_BY_EMAIL_PATH, UserTO.class, username).getBody();

    }
}
