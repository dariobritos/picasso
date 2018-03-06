package org.proygrad.picasso.rest.client;

import org.apache.log4j.Logger;
import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.rest.api.user.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    private static final Logger LOGGER = Logger.getLogger(TuringClient.class);


    /*CODIGO TEMPORAL MIENTRAS NO SE TENGAN LOS SERVICIOS DE TURING*/
    private Map<String, ScenarioTO> scenarios;
    private Map<String, UserTO> users;

    @PostConstruct
    private void init() {
        scenarios = new HashMap<>();
        users = new HashMap<>();

        //TODO: QUITAR, es solo para pruebas
        UserTO admin = new UserTO();
        admin.setId("admin");
        admin.setEmail("admin@admin.com");
        admin.setName("Admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
        users.put("admin@admin.com",admin);
    }


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
        //  "/user/{id}", method = RequestMethod.GET)

        LOGGER.info("User added " + user.getEmail() + " " + user.getPassword());

        String id = UUID.randomUUID().toString();
        user.setId(id);
        users.put(id, user);
        return id;

 		return restTemplate.postForEntity(TURING_HOST + USER_PATH, user, String.class).getBody();
  
    }

    public UserTO findByUsername(String username) {
        return users.values().stream().filter(u->u.getEmail().equals(username)).findFirst().get();
    }
}
