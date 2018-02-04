package org.proygrad.picasso.rest.client;

import org.proygrad.picasso.rest.api.scenario.ScenarioTO;
import org.proygrad.picasso.rest.api.user.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.*;

public class TuringClient {

    private static String GET_SCENARIOS = "http://turing/scenario";

    @Autowired
    private RestTemplate restTemplate;



    /*CODIGO TEMPORAL MIENTRAS NO SE TENGAN LOS SERVICIOS DE TURING*/
    private Map<String,ScenarioTO> scenarios;
    private Map<String,UserTO> users;

    @PostConstruct
    private void init() {
        scenarios = new HashMap<>();
        users = new HashMap<>();
    }


    public ScenarioTO getScenario(String id)    {
        //return restTemplate.getForEntity(GET_SCENARIOS,ScenarioTO.class, id ).getBody();

        // "/scenario/{id}", method = RequestMethod.GET)

        return scenarios.get(id);

    }


    public List<ScenarioTO> getScenarios() {

        // "/user/{id}/scenarios", method = RequestMethod.GET)
        // vemos de dejar siempre el mismo useddr id dsp ampliamos.

        return new ArrayList<>(scenarios.values());
    }



    public void updateScenario(String id, ScenarioTO scenario) {

        // "/scenario/{id}/input", method = RequestMethod.PATCH) // todo menos output

        // "/scenario/{id}/output", method = RequestMethod.PATCH) // solo output

        scenarios.put(id,scenario);
    }

    public String addScenario(ScenarioTO scenario) {

        // "/scenario", method = RequestMethod.POST)

        String id = UUID.randomUUID().toString();
        scenario.setId(id);
        scenarios.put(id, scenario);
        return id;
    }


    public List<UserTO> getUsers() {
        // TODO:

        return new ArrayList<>(users.values());
    }

    public UserTO getUser(String id) {
        // "/user/{id}", method = RequestMethod.GET)

        return users.get(id);
    }

    public void updateUser(String id,UserTO user) {
        //  "/user/{id}", method = RequestMethod.PATCH)
        // TODO: afinar que dejamos editar hoy solo sobreescribe el nomnbre.

        users.put(id,user);
    }

    public String addUser(UserTO user) {
        //  "/user/{id}", method = RequestMethod.GET)

        String id = UUID.randomUUID().toString();
        user.setId(id);
        users.put(id, user);
        return id;
    }
}
