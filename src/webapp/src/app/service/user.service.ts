import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {User} from "../entities/user";
import {Router} from "@angular/router";


@Injectable()
export class UserService {
    private userUrl = 'rest/user';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,private router: Router) {
    }

    getUser(id: string): Promise<User> {
        const url = `${this.userUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }


    create(user: User): Promise<string> {
        return this.http
            .post(this.userUrl, JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(res => res.text())
            .catch(this.handleError);
    }

    update(user: User): Promise<User> {
        const url = `${this.userUrl}/${user.id}`;
        return this.http
            .put(url, JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
