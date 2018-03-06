import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {ScenarioService} from "../../service/scenario.service";
import {Scenario} from "../../entities/scenario";
import {scenarioTypesConst} from "../utils/constant/constants";
import {ScenarioTypePipe} from "../utils/pipes/scenario-type.pipe";

@Component({
    selector: 'my-scenarios',
    templateUrl: './scenarios.component.html',
    styleUrls: ['./scenarios.component.css'],
    providers: [ScenarioService]
})
export class ScenariosComponent implements OnInit {
    scenario: Scenario[];
    selectedScenario: Scenario;

    selectedTypeScenario: string ='SE_SURFACE_CRACK_STRAIGHT_PIPE'

    scenarioTypes = scenarioTypesConst;

    constructor(private router: Router,
                private scenarioService: ScenarioService) {
    }

    scenarioTypesPipe: ScenarioTypePipe = new ScenarioTypePipe();

  /*  getScenarios(): void {
        this.scenarioService.getScenarios().then(scenario => {
            this.scenario = scenario;
        });
    }*/

    ngOnInit(): void {
        //this.getScenarios();
    }

    update(): void {
        this.selectedTypeScenario = '1';
    }


    getPicture(): string {

        if(this.selectedTypeScenario === 'SE_SURFACE_CRACK_STRAIGHT_PIPE'){
            return 'scenario1';
        }

        return 'scenario2';
    }

    getEndLink(): string {

        if(this.selectedTypeScenario === 'SE_SURFACE_CRACK_STRAIGHT_PIPE'){
            return 'semi-elliptical-surface-crack-in-a-straight-pipe';
        }

        return 'simple-iron-bar';
    }


    gotoDetail(): void {
        this.router.navigate(['/scenario', this.selectedScenario.id]);
    }

}

