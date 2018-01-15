package org.proygrad.picasso.rest.controller;


import org.proygrad.picasso.rest.api.user.UserTO;
import org.proygrad.picasso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class UserController {


    @Autowired
    private UserService userService;


    @RequestMapping(value = "/rest/user", method = RequestMethod.GET)
    public List<UserTO> Users() {
        return userService.getUsers();
    }


    @RequestMapping(value = "/rest/user/{id}", method = RequestMethod.GET)
    public UserTO User(@PathVariable String id) {
        return userService.getUser(id);
    }

    @RequestMapping(value = "/rest/user/{id}", method = RequestMethod.PUT)
    public UserTO updateUser(@PathVariable String id, @RequestBody UserTO user) {
        userService.updateUser(id, user);
        return userService.getUser(id);
    }

    @RequestMapping(value = "/rest/user", method = RequestMethod.POST)
    public String addUser(@RequestBody UserTO data) {
        return userService.addUser(data);
    }
}
