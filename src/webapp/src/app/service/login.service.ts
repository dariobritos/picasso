import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserStorage} from "./user-storage.service";
import {UserService} from "./user.service";
import {Http} from "@angular/http";
import {User} from "../entities/User";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";


export interface Credentials {
    username: string;
    password: string;
}

@Injectable()
export class LoginService {


    constructor(private router: Router,
                private userService: UserService,
                private http: Http,
                private userStorage: UserStorage) {
    }


    login(username: string, password: string) : Promise<any> {
        let credentials: Credentials = {
            "username": username,
            "password": password,
        };
        return this.http
            .post('/login', JSON.stringify(credentials), {})
            .toPromise()
            .then(res => {
                let user: User = res.json() as User;
                let token = res.headers.get("Authorization");
                this.userStorage.storeToken(token);
                this.userStorage.storeUserInfo(btoa(JSON.stringify(user)));
            })
            .catch();
    }


    logout(navigatetoLogout = true): void {
        // clear token remove newUser from local storage to log newUser out
        this.userStorage.removeUserInfo();
        if (navigatetoLogout) {
            this.router.navigate(["home"]);
        }
    }
}
