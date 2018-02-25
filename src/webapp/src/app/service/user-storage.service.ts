import {Injectable} from '@angular/core';
import {User} from "../entities/User";


export interface LoginInfoInStorage{
    success:boolean;
    message:string;
}

@Injectable()
export class UserStorage {

    public currentUserKey:string="currentUser";
    public storage:Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor() {}

    //Store userinfo from session storage
    storeUserInfo(userInfoString:string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    //Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
    }

    //Get userinfo from session storage
    getUserInfo():User|null {
        try{
            let userInfoString:string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                let userObj:User = JSON.parse(this.storage.getItem(this.currentUserKey));
                return userObj;
            }
            else{
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }

    isLoggedIn():boolean{
        return !!this.storage.getItem(this.currentUserKey);
    }

    //Get User's Display name from session storage
    getUserName():string{
        let userObj:User = this.getUserInfo();
        if (userObj!== null){
            return userObj.name
        }
        return "no-user";
    }

    getStoredToken():string|null {
        let userObj:User = this.getUserInfo();
        if (userObj !== null){
            return userObj.token;
        }
        return null;
    }
}
