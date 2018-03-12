import {Component, OnInit, ViewChild} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {AuthGuard} from "../../service/auth_guard.service";
import {Router} from "@angular/router";
import {UserStorage} from "../../service/user-storage.service";
import {User} from "../../entities/User";
import {isNullOrUndefined} from "util";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor(private loginService: LoginService,
                private authGuard: AuthGuard,
                private userStorage: UserStorage,
                private router: Router) {
    }

    form: FormGroup;

    user: string;
    password: string;

    loading: boolean;
    badCredentials: boolean;

    ngOnInit(): void {
        this.badCredentials = false;
        this.loading = false;


        this.form = new FormGroup({
            'email': new FormControl(this.user, [
                Validators.required,
                Validators.email,
            Validators.minLength(1)]),
            'password': new FormControl(this.user, [
                Validators.required,
                Validators.minLength(1)])
        });

        console.log(this.form.valid);
    }

    login() {

        if(!this.form.valid){
            return;
        }

        this.loading = true;
        if (isNullOrUndefined(this.user) || this.user == '') {
        }
        this.loginService.login(this.user, this.password).then(() => {
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    isLoading(): boolean {
        return this.loading;
    }

    currentUser(): User {
        return this.userStorage.getUserInfo();
    }

    loggedIn(): boolean {
        return this.authGuard.checkLogin();
    }
}
