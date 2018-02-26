package org.proygrad.picasso.rest.client;

import org.apache.commons.lang.StringUtils;
import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.rest.api.user.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.*;

public class TuringClient {

    private final static String TURING_HOST = "http://turing/";

    private final static String SCENARIO_PATH = "scenario/";
    private final static String INPUT_PATH = "{}/input";
    private final static String SCENARIO_USER_PATH = "scenario?user_id={}";

    private final static String USER_PATH = "user/";
    private final static String ALL_USER_PATH = "all";

    @Autowired
    private RestTemplate restTemplate;

    public ScenarioTO getScenario(String id) {
        return restTemplate.getForEntity(TURING_HOST + SCENARIO_PATH + id, ScenarioTO.class, id).getBody();
    }


    public List<ScenarioTO> getScenarios(String userId) {
        // Recordar que esta limitado a los ultimos 10
        ResponseEntity<ScenarioTO[]> responseEntity = restTemplate.getForEntity(TURING_HOST + SCENARIO_USER_PATH, ScenarioTO[].class, userId);
        ScenarioTO[] objects = responseEntity.getBody();

        return  new ArrayList(Arrays.asList(objects));
   }


    //No se harian actualizaciones de un escenario
    public String updateScenario(String id, ScenarioTO scenario) {
        return restTemplate.patchForObject(TURING_HOST + SCENARIO_PATH + INPUT_PATH, (Object) scenario, String.class, scenario.getId());
    }

    public String addScenario(ScenarioTO scenario) {
        return restTemplate.postForEntity(TURING_HOST + SCENARIO_PATH, scenario, String.class).getBody();
    }


    public List<UserTO> getUsers() {
        // Recordar que esta limitado a 10, ver si se usara...
        ResponseEntity<UserTO[]> responseEntity = restTemplate.getForEntity(TURING_HOST + SCENARIO_USER_PATH + ALL_USER_PATH, UserTO[].class);
        UserTO[] objects = responseEntity.getBody();

        return  new ArrayList(Arrays.asList(objects));
    }

    public UserTO getUser(String id) {
        return restTemplate.getForEntity(TURING_HOST + USER_PATH + id, UserTO.class, id).getBody();
    }

    public String updateUser(String id, UserTO user) {
        return restTemplate.patchForObject(TURING_HOST + USER_PATH + id, (Object) user, String.class);
    }

    public String addUser(UserTO user) {
        return restTemplate.postForEntity(TURING_HOST + USER_PATH, user, String.class).getBody();
    }

}
