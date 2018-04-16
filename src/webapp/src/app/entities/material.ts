import {Parameter} from "./parameter";

export class MaterialProperty extends Parameter {

}

export class Material {

    id: string;
    userId: string;
    name: string;
    properties: Array<MaterialProperty>;


    constructor( userId: string, name: string, properties: Array<MaterialProperty>) {
        this.userId = userId;
        this.name = name;
        this.properties = properties;
    }
}
