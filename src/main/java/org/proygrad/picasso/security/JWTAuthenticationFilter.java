package org.proygrad.picasso.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.proygrad.picasso.rest.api.user.CredentialsTO;
import org.proygrad.picasso.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
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
    private AuthenticationManager authenticationManager;
    private UserService userService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //Este metodo se ejecuta cuando se realiza correctamente la autenticacion del usuario.
    //Le agrega al response el header con el JWT
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String email = ((User) auth.getPrincipal()).getUsername();

        String token = SecurityUtils.generateToken(email);

        res.addHeader(HEADER_STRING_AUTHORIZATION, TOKEN_PREFIX_BEARER + token);

        res.setStatus(HttpServletResponse.SC_OK);
        String id = userService.findByUsername(email).getId();
        String json = "{\"id\":\"" + id +"\"}";
        res.getWriter().write(json);
        res.getWriter().flush();
        res.getWriter().close();
    }
}