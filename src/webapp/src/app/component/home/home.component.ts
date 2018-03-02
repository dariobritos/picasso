import {Component} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";
import {UserStorage} from "../../service/user-storage.service";
import {User} from "../../entities/User";
import {UserService} from "../../service/user.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(
        private loginService: LoginService,
        private authGuard: AuthGuard,
        private userStorage: UserStorage,
        private router: Router
    ) { }

    user: string;
    password: string;


    login() {
        this.loginService.login(this.user,this.password);
    }

    currentUser():User{
        return this.userStorage.getUserInfo();
    }

    loggedIn():boolean{
        return this.authGuard.checkLogin();
    }
}
