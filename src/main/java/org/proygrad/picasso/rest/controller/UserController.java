package org.proygrad.picasso.rest.controller;


import org.proygrad.picasso.rest.api.user.UserTO;
import org.proygrad.picasso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController()
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @RequestMapping(value = "/rest/user/{id}", method = RequestMethod.GET)
    public UserTO User(@PathVariable String id) {
        return userService.getUser(id);
    }

    @RequestMapping(value = "/rest/user/{id}", method = RequestMethod.PUT)
    public UserTO updateUser(@PathVariable String id, @RequestBody UserTO user) {
        userService.updateUser(id, user);
        return userService.getUser(id);
    }

    @RequestMapping(value = "/rest/sign-up", method = RequestMethod.POST)
    public String addUser(@RequestBody UserTO data) {
        data.setPassword(bCryptPasswordEncoder.encode(data.getPassword()));
        return userService.addUser(data);
    }
}
