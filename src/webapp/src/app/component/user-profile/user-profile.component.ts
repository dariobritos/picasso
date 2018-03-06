import {Component, OnInit} from "@angular/core";
import {User} from "../../entities/User";
import {scenarioTypesConst} from "../utils/constant/constants";
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

    scenarioTypes = scenarioTypesConst;


    ngOnInit(): void {

        this.authGuard.verifyLocation();

        this.user = this.userStorage.getUserInfo();
    }


}
