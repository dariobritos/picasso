import {Component} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(
        private loginService: LoginService,
        private authGuard: AuthGuard,
        private router: Router
    ) { }

    user: string;
    password: string;


    login() {
        this.loginService.login(this.user,this.password);
        if(this.loggedIn()){
            this.router.navigate(['/scenarios']);
        }
    }

    loggedIn():boolean{
        return this.authGuard.checkLogin();
    }
}
