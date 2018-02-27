import {Injectable} from '@angular/core';
import {User} from "../entities/User";


export interface LoginInfoInStorage{
    success:boolean;
    message:string;
}

@Injectable()
export class UserStorage {

    public CURRENT_USER:string="CURRENT_USER";
    public CURRENT_TOKEN:string="CURRENT_TOKEN";
    public storage:Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor() {}

    //Store userinfo from session storage
    storeUserInfo(userInfoString:string) {
        this.storage.setItem(this.CURRENT_USER, userInfoString);
    }

    //Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.CURRENT_USER);
        this.storage.removeItem(this.CURRENT_TOKEN);
    }

    //Get userinfo from session storage
    getUserInfo():User|null {
        try{
            let userInfoString:string = this.storage.getItem(this.CURRENT_USER);
            if (userInfoString) {
                let userObj:User = JSON.parse(this.storage.getItem(this.CURRENT_USER));
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
        return !!this.storage.getItem(this.CURRENT_USER);
    }

    //Get User's Display name from session storage
    getUserName():string{
        let userObj:User = this.getUserInfo();
        if (userObj!== null){
            return userObj.name
        }
        return "no-name";
    }

    storeToken(token:string){
        this.storage.setItem(this.CURRENT_TOKEN,token);
    }

    getStoredToken():string|null {
        return this.storage.getItem(this.CURRENT_TOKEN);
    }
}
