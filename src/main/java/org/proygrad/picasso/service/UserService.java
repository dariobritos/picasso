package org.proygrad.picasso.service;

import org.proygrad.picasso.rest.api.user.UserTO;
import org.proygrad.picasso.rest.client.TuringClient;
import org.proygrad.picasso.rest.exception.ServiceUnavailableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import static java.util.Collections.emptyList;

//UserDetailsService se utiliza en el contexton de seguridad para autorizar y autenticar
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private TuringClient turingClient;


    public UserTO getUser(String id) {
        return turingClient.getUser(id);
    }

    public void updateUser(String id, UserTO user) {
        turingClient.updateUser(id,user);
    }

    public String addUser(UserTO user) {
        return turingClient.addUser(user);
    }

    public UserTO findByUsername(String username) {
        try {
            return turingClient.findByUsername(username);
        } catch (HttpClientErrorException e) {
            switch (e.getStatusCode()){
                case NOT_FOUND:
                    throw new UsernameNotFoundException(username);
                case INTERNAL_SERVER_ERROR:
                case SERVICE_UNAVAILABLE:
                    throw new ServiceUnavailableException();
            }

        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserTO user = this.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(user.getEmail(), user.getPassword(),emptyList());
    }


}
