import {Component, OnInit} from "@angular/core";
import {NewUser, User} from "../../entities/User";
import {scenarioTypesConst, USER} from "../utils/constant/constants";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
    selector: 'user-profile',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    newUser: NewUser;

    scenarioTypes = scenarioTypesConst;

    constructor(
        private authGuard: AuthGuard,
        private router: Router,
        private userService: UserService
    ) { }


    ngOnInit(): void {
        this.newUser = new NewUser;

        //Si ya se esta logueado, se redirige a la home
        if(this.authGuard.checkLogin()){
            this.router.navigate(['/home'])
        }

    }

    signup(): void{
        this.userService.signUp(this.newUser);
    }

}
