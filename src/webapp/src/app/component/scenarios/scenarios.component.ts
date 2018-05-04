import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {ScenarioService} from "../../service/scenario.service";
import {SCENARIO_TYPES} from "../utils/constant/constants";
import {ScenarioTypePipe} from "../utils/pipes/scenario-type.pipe";
import {AuthGuard} from "../../service/auth_guard.service";


@Component({
    selector: 'my-scenarios',
    templateUrl: './scenarios.component.html',
    styleUrls: ['./scenarios.component.css'],
    providers: [ScenarioService]
})
export class ScenariosComponent implements OnInit {

    selectedTypeScenario: string ='SE_SURFACE_CRACK_STRAIGHT_PIPE'

    scenarioTypes = SCENARIO_TYPES;

    constructor(private router: Router,
                private authGuard: AuthGuard,
                private scenarioService: ScenarioService) {
    }

    scenarioTypesPipe: ScenarioTypePipe = new ScenarioTypePipe();


    ngOnInit(): void {
        this.authGuard.verifyLocation();
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

        return 'circular-section-bar-subjected-to-traction';
    }

}

