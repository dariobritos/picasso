import {Component, OnInit} from "@angular/core";
import {User} from "../../entities/User";
import {SCENARIO_TYPES} from "../utils/constant/constants";
import {AuthGuard} from "../../service/auth_guard.service";
import {UserStorage} from "../../service/user-storage.service";
import {UserService} from "../../service/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LanguageService} from "../../service/language.service";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


    constructor(private authGuard: AuthGuard,
                private userStorage: UserStorage,
                private userService: UserService,
                private router: Router,
                private languageService: LanguageService) {
    }

    form: FormGroup;

    user: User;

    loading: boolean;

    scenarioTypes = SCENARIO_TYPES;


    ngOnInit(): void {

        this.authGuard.verifyLocation();

        this.user = this.userStorage.getUserInfo();


        this.form = new FormGroup({
            'email': new FormControl(
                {
                    value:
                    this.user.email,
                    validators: [
                        Validators.required,
                        Validators.email,
                        Validators.minLength(1)],
                    disabled: true
                }
            ),
            'name': new FormControl(this.user.name, [
                Validators.required,
                Validators.minLength(1)]),
            'surname': new FormControl(this.user.surname, [
                Validators.required,
                Validators.minLength(1)]),
            'organization': new FormControl(this.user.organization, [
                Validators.required,
                Validators.minLength(1)]),
            'unitINT': new FormControl(this.user.preferences.unitSystem, []),
            'unitUS': new FormControl(this.user.preferences.unitSystem, []),
            'languageEN': new FormControl(this.user.preferences.language, []),
            'languageES': new FormControl(this.user.preferences.language, []),
            'fastScenario': new FormControl(this.user.preferences.fastScenario, [])
        });
    }

    languageSelect(lan: string) {
        this.user.preferences.language = lan;
    }

    unitSystemSelect(unitSys: string) {
        this.user.preferences.unitSystem = unitSys;
    }

    updateUser() {
        this.loading = true;
        this.userService.update(this.user).then(() => {
            this.userStorage.storeUserInfo(btoa(JSON.stringify(this.user)));
            this.languageService.reloadLanguage();
            this.loading = false;
            this.router.navigate(["/home"])
        }).catch(() => {
            this.loading = false;
        });
    }


}
