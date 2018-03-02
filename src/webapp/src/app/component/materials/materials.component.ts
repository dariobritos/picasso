import {Component, OnInit} from "@angular/core";
import {AuthGuard} from "../../service/auth_guard.service";

@Component({
    selector: 'materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

    constructor(private authGuard: AuthGuard) {
    }

    ngOnInit(): void {
        this.authGuard.verifyLocation();
    }


}
