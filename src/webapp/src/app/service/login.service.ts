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
import {TranslateService} from "ng2-translate";
import {LanguageService} from "./language.service";


export interface Credentials {
    username: string;
    password: string;
}

@Injectable()
export class LoginService {


    constructor(private router: Router,
                private http: Http,
                private userStorage: UserStorage,private ln:LanguageService) {
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
                this.ln.reloadLanguage();
                this.router.navigate(["home"]);
            })
            .catch();
    }


    logout(): void {
        // clear token remove newUser from local storage to log newUser out
        this.userStorage.removeUserInfo();
        this.ln.reloadLanguage();
        this.router.navigate(["home"]);

    }



}
