import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Material} from "../entities/material";
import {UserStorage} from "./user-storage.service";
import {isNullOrUndefined} from "util";


@Injectable()
export class MaterialService {
    private materialUrl = 'rest/material';  // URL to web api
    private materialByUserUrl = 'rest/material?user_id=';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,private storage: UserStorage) {
    }

    getMaterial(id: string): Promise<Material> {
        const url = `${this.materialUrl}/${id}`;
        return this.http.get(url, {headers: this.buildHeaders()})
            .toPromise()
            .then(response => response.json() as Material)
            .catch(this.handleError);
    }

    create(material: Material): Promise<string> {
        return this.http
            .post(this.materialUrl, JSON.stringify(material), {headers: this.buildHeaders()})
            .toPromise()
            .then(res => res.text())
            .catch(this.handleError);
    }

    getMaterialsForUser(): Promise<Material[]> {

        let userInfo = this.storage.getUserInfo();


        const url = `${this.materialByUserUrl}${userInfo.id}`;
        return this.http.get(url, {headers: this.buildHeaders()})
            .toPromise()
            .then(response => response.json() as Material[])
            .catch(this.handleError);
    }

    delete(id: String) {
        const url = `${this.materialUrl}/${id}`;
        return this.http.delete(url, {headers: this.buildHeaders()})
            .toPromise()
            .then()
            .catch(this.handleError);
    }


    update(material: Material): Promise<Material> {
        const url = `${this.materialUrl}/${material.id}`;
        return this.http
            .patch(url, JSON.stringify(material), {headers: this.buildHeaders()})
            .toPromise()
            .then(() => material)
            .catch(this.handleError);
    }

    private buildHeaders():Headers{
        //Agregamos el header de autorizacion
        this.headers.set("Authorization",this.storage.getStoredToken());
        return this.headers;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
