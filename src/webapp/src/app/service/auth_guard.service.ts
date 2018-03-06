import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {UserStorage} from "./user-storage.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private userStorage: UserStorage
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin();
        //return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(): boolean {
        if (this.userStorage.isLoggedIn()) {
            return true;
        }
        return false;
    }

    verifyLocation(){
        if(!this.checkLogin()){
            console.log("home");
            this.router.navigate(["/home"]);
        }
    }
}
