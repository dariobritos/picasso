package org.proygrad.picasso.service;

import org.proygrad.picasso.rest.api.user.UserTO;
import org.proygrad.picasso.rest.client.TuringClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private TuringClient turingClient;

    public List<UserTO> getUsers() {
        return turingClient.getUsers();
    }

    public UserTO getUser(String id) {
        return turingClient.getUser(id);
    }

    public void updateUser(String id, UserTO user) {
        turingClient.updateUser(id,user);
    }

    public String addUser(UserTO user) {
        return turingClient.addUser(user);
    }
}
