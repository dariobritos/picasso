import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserStorage} from "./user-storage.service";
import {TranslateService} from "ng2-translate";


@Injectable()
export class LanguageService {


    constructor(private userStorage: UserStorage,private tr:TranslateService) {
        tr.setDefaultLang('en');
    }

    reloadLanguage() {
        if (this.userStorage.isLoggedIn()) {
            switch (this.userStorage.getUserInfo().preferences.language) {
                case 'EN':
                    this.tr.setDefaultLang("en");
                    this.tr.use("en");
                    break;
                case 'ES':
                    this.tr.setDefaultLang("es");
                    this.tr.use("es");
                    break;
            }
        } else {
            this.tr.use(this.tr.getBrowserCultureLang());
        }
    }
}
