import {Component, OnInit} from '@angular/core';
import {ScenarioService} from "../../service/scenario.service";
import {Scenario} from "../../entities/scenario";
import {AuthGuard} from "../../service/auth_guard.service";


@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    scenarios: Scenario[] = [];

    constructor(private scenarioService: ScenarioService,
    private authGuard: AuthGuard) {
    }

    ngOnInit(): void {
        this.authGuard.verifyLocation();
    }
}
