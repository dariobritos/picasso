import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {LanguageService} from "../../service/language.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit{


    constructor(private router : Router,private ln:LanguageService) {
        this.ln.reloadLanguage();
    }

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                window.scrollTo(0, 0);
                return;
            }
        });
    }


}
