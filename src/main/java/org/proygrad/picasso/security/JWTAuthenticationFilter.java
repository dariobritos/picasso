package org.proygrad.picasso.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.proygrad.picasso.rest.api.user.CredentialsTO;
import org.proygrad.picasso.rest.api.user.UserTO;
import org.proygrad.picasso.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static org.proygrad.picasso.security.SecurityUtils.HEADER_STRING_AUTHORIZATION;
import static org.proygrad.picasso.security.SecurityUtils.TOKEN_PREFIX_BEARER;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static final Logger LOGGER = Logger.getLogger(JWTAuthenticationFilter.class);


    private AuthenticationManager authenticationManager;
    private UserService userService;
    private ObjectMapper mapper;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, ObjectMapper mapper) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.mapper = mapper;
    }


    //Este filtro itercepta el request, y toma el header de autenticacion, el mismo se le pasa
    //al authentication manager
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            CredentialsTO creds = new ObjectMapper()
                    .readValue(req.getInputStream(), CredentialsTO.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        }catch (BadCredentialsException bex){
            throw bex;
        }
        catch (Exception e){
            res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
        }
        return null;
    }

    //Este metodo se ejecuta cuando se realiza correctamente la autenticacion del usuario.
    //Le agrega al response el header con el JWT
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String email = ((User) auth.getPrincipal()).getUsername();

        res.setStatus(HttpServletResponse.SC_OK);

        UserTO user = userService.findByUsername(email);
        user.erasePassword();

        String userJson = mapper.writeValueAsString(user);


        String token = SecurityUtils.generateToken(userJson);
        res.addHeader(HEADER_STRING_AUTHORIZATION, TOKEN_PREFIX_BEARER + token);


        res.getWriter().write(userJson);
        res.getWriter().flush();
        res.getWriter().close();


    }
}