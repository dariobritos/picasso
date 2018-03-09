import {Component, OnInit} from "@angular/core";
import {NewUser, User} from "../../entities/User";
import {SCENARIO_TYPES, USER} from "../utils/constant/constants";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'user-profile',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    newUser: NewUser;

    language : string = 'EN';

    scenarioTypes = SCENARIO_TYPES;

    constructor(
        private authGuard: AuthGuard,
        private router: Router,
        private userService: UserService,
        private loginService : LoginService
    ) { }


    ngOnInit(): void {
        this.newUser = new NewUser;

        if(this.authGuard.checkLogin()){
            console.log("home");
            this.router.navigate(["/home"]);
        }
    }

    signup(): void{
        this.userService.signUp(this.newUser).toPromise().then((s)=>{
            this.login();
        });
    }

    login() {
        this.loginService.login(this.newUser.email,this.newUser.password);
    }

    languageSelect(lan: string) {
        this.newUser.preferences.language = lan;
    }

    unitSystemSelect(unitSys: string) {
        this.newUser.preferences.unitSystem = unitSys;
    }
}
