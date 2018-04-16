package org.proygrad.picasso.rest.api.material;

import java.io.Serializable;
import java.util.List;

public class MaterialTO  implements Serializable {


    private String id;
    private String userId;
    private String name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PropertyTO> getProperties() {
        return properties;
    }

    public void setProperties(List<PropertyTO> properties) {
        this.properties = properties;
    }

}
