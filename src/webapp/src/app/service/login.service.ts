import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserStorage} from "./user-storage.service";
import {UserService} from "./user.service";
import {User} from "../entities/User";


export interface LoginRequestParam {
    username: string;
    password: string;
}

@Injectable()
export class LoginService {


    constructor(private router: Router,
                private userService: UserService,
                private userStorage: UserStorage) {
    }


    login(username: string, password: string): Observable<any> {


        let loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]); // Will use this BehaviorSubject to emit data that we want after ajax login attempt

        //TODO: Postear el login y obtener el token y el usuario

        this.userStorage.storeUserInfo(JSON.stringify(new User()));
        return loginDataSubject;
    }

    logout(navigatetoLogout = true): void {
        // clear token remove user from local storage to log user out
        this.userStorage.removeUserInfo();
        if (navigatetoLogout) {
            this.router.navigate(["home"]);
        }
    }
}
