import {Component, OnInit} from "@angular/core";
import {NewUser} from "../../entities/User";
import {SCENARIO_TYPES} from "../utils/constant/constants";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {LoginService} from "../../service/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'user-profile',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    form: FormGroup;

    newUser: NewUser;

    language: string = 'EN';

    scenarioTypes = SCENARIO_TYPES;

    loading: boolean;

    constructor(private authGuard: AuthGuard,
                private router: Router,
                private userService: UserService,
                private loginService: LoginService) {
    }


    ngOnInit(): void {
        this.newUser = new NewUser;

        this.loading = false;

        if (this.authGuard.checkLogin()) {
            this.router.navigate(["/home"]);
        }

        this.form = new FormGroup({
            'email': new FormControl(this.newUser.email, [
                Validators.required,
                Validators.email,
                Validators.minLength(1)]),
            'password': new FormControl(this.newUser.password, [
                Validators.required,
                Validators.minLength(1)]),
            'name': new FormControl(this.newUser.name, [
                Validators.required,
                Validators.minLength(1)]),
            'surname': new FormControl(this.newUser.surname, [
                Validators.required,
                Validators.minLength(1)]),
            'organization': new FormControl(this.newUser.organization, [
                Validators.required,
                Validators.minLength(1)]),
            'unitINT': new FormControl(this.newUser.organization, []),
            'unitUS': new FormControl(this.newUser.organization, []),
            'languageEN': new FormControl(this.newUser.organization, []),
            'languageES': new FormControl(this.newUser.organization, [])
        });
    }

    signup(): void {

        if (!this.form.valid) {
            return;
        }

        this.loading = true;

        this.userService.signUp(this.newUser).toPromise().then((s) => {
            this.login();
        });
    }

    login() {

        this.loginService.login(this.newUser.email, this.newUser.password).then(() => {
            this.router.navigate(['/home']);
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    languageSelect(lan: string) {
        this.newUser.preferences.language = lan;
    }

    unitSystemSelect(unitSys: string) {
        this.newUser.preferences.unitSystem = unitSys;
    }
}
