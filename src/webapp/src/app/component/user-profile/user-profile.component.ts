import {Component, OnInit} from "@angular/core";
import {User} from "../../entities/User";
import {SCENARIO_TYPES} from "../utils/constant/constants";
import {AuthGuard} from "../../service/auth_guard.service";
import {UserStorage} from "../../service/user-storage.service";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


    constructor(private authGuard: AuthGuard,
                private userStorage: UserStorage) {
    }

    user: User;

    scenarioTypes = SCENARIO_TYPES;


    ngOnInit(): void {

        this.authGuard.verifyLocation();

        this.user = this.userStorage.getUserInfo();
    }


}
