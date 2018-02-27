import {Component} from '@angular/core';
import {AuthGuard} from "../../../service/auth_guard.service";
import {LoginService} from "../../../service/login.service";
import {Router} from "@angular/router";
import {User} from "../../../entities/User";
import {UserStorage} from "../../../service/user-storage.service";

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

    constructor(
        private authGuard: AuthGuard,
        private loginService: LoginService,
        private userStorage: UserStorage,
        private router: Router
    ) { }

    itemClick() {
        $('.navbar-collapse').collapse('hide');
    }

    signup(){
        this.router.navigate(['signup']);
        this.itemClick();
    }

    logout(){
        this.loginService.logout();
        this.itemClick();
    }


    loggedIn():boolean{
        return this.authGuard.checkLogin();
    }

    currentUser():User{
        return this.userStorage.getUserInfo();
    }
}
