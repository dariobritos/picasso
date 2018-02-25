import {Component, OnInit} from "@angular/core";
import {User} from "../../entities/User";
import {scenarioTypesConst, USER} from "../utils/constant/constants";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";

@Component({
    selector: 'user-profile',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    user: User;

    scenarioTypes = scenarioTypesConst;

    constructor(
        private authGuard: AuthGuard,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.user = new User;


        //Si ya se esta logueado, se redirige a la home
        if(this.authGuard.checkLogin()){
            this.router.navigate(['/home'])
        }

    }

    signup(): void{

    }

}
