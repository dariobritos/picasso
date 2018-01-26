import {Component, OnInit} from '@angular/core';
import {ScenarioService} from "../../service/scenario.service";
import {Scenario} from "../../entities/scenario";


@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    scenarios: Scenario[] = [];

    constructor(private scenarioService: ScenarioService) {
    }

    ngOnInit(): void {
        this.scenarioService.getScenarios()
            .then(scenarios => this.scenarios = scenarios);
    }
}
