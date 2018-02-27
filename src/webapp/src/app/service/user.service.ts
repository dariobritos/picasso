import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {User} from "../entities/User";
import {Router} from "@angular/router";
import {UserStorage} from "./user-storage.service";


@Injectable()
export class UserService {
    private userUrl = 'rest/user';  // URL to web api
    private signupUrl = 'rest/sign-up';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,private router: Router, private storage: UserStorage) {
    }

    getUser(id: string): Promise<User> {
        const url = `${this.userUrl}/${id}`;
        return this.http.get(url, {headers: this.buildHeaders()})
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }


    signUp(user: User): Promise<string> {
        return this.http
            .post(this.signupUrl, JSON.stringify(user), {headers: this.buildHeaders()})
            .toPromise()
            .then(res => res.text())
            .catch(this.handleError);
    }

    update(user: User): Promise<User> {
        const url = `${this.userUrl}/${user.id}`;
        return this.http
            .put(url, JSON.stringify(user), {headers: this.buildHeaders()})
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private buildHeaders():Headers{
        //Agregamos el header de autorizacion
        this.headers.set("Authorization",this.storage.getStoredToken());
        return this.headers;
    }

}
