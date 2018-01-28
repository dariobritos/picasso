package org.proygrad.picasso.rest.api.scenario;

public class CommonItem {

    private String code;
    private String value;

    public CommonItem() {
    }

    public CommonItem(String code, String value) {
        this.code = code;
        this.value = value;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
