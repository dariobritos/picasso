import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserStorage} from "./user-storage.service";
import {UserService} from "./user.service";
import {User} from "../entities/User";
import {Http} from "@angular/http";


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


    login(username: string, password: string): boolean {


        let credentials:Credentials = {
            "username": username,
            "password": password,
        };


        this.http.post('/login', credentials)
            .subscribe(jsonResp => {
                    if (jsonResp !== undefined && jsonResp !== null){
                        //Create a success object that we want to send back to login page

                        let id = jsonResp.json().id;
                        let token = jsonResp.headers.get("Authorization");
                        this.userStorage.storeToken(token);
                        console.log(token);
                        this.userService.getUser(id).then((u) => {
                            this.userStorage.storeUserInfo(btoa(JSON.stringify(u)));
                        });

                        return true;
                    }
                    else {
                        //Create a faliure object that we want to send back to login page
                        return false;
                    }
                },
                err => {
                    console.log(err);
                });

        return false;
    }

    logout(navigatetoLogout = true): void {
        // clear token remove newUser from local storage to log newUser out
        this.userStorage.removeUserInfo();
        if (navigatetoLogout) {
            this.router.navigate(["home"]);
        }
    }
}
