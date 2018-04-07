package org.proygrad.picasso.rest.api.material;

import java.util.List;

public class MaterialTO {

    private String id;
    private String userId;
    private String description;
    private List<PropertyTO> properties;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<PropertyTO> getProperties() {
        return properties;
    }

    public void setProperties(List<PropertyTO> properties) {
        this.properties = properties;
    }

}
