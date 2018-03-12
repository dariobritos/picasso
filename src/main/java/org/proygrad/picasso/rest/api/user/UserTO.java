package org.proygrad.picasso.rest.api.user;

import java.io.Serializable;

public class UserTO implements Serializable {

    private String id;
    private String password;


    private String name;
    private String surname;
    private String organization;


    private String email;
    private UserPreferencesTO preferences;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserPreferencesTO getPreferences() {
        return preferences;
    }

    public void setPreferences(UserPreferencesTO preferences) {
        this.preferences = preferences;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public void erasePassword(){
        this.password = "";
    }
}
