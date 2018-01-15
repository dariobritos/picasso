import {Component, Inject, OnInit} from '@angular/core';
import {Scenario, Configuration, Parameter} from "../../../entities/scenario";
import {CENTIMETER, DISTANCE, LOG_NORMAL, SE_SURFACE_CRACK_STRAIGHT_PIPE, STATIC} from "../../utils/constant/constants";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ScenarioService} from "../../../service/scenario.service";


@Component({
    selector: 'my-scenarios',
    templateUrl: './SESCIASP.component.html',
    styleUrls: ['./SESCIASP.component.css']
})
export class SESCIASPComponent {

    scenario: Scenario;

    scenarioType = SE_SURFACE_CRACK_STRAIGHT_PIPE;

    form: FormGroup;

    constructor(private router: Router,
                private scenarioService: ScenarioService) {
        this.scenario = new Scenario();
        this.scenario.parameters = new Map([
            ['CRACK_DEPTH', new Parameter('CRACK_DEPTH', LOG_NORMAL, 0, CENTIMETER, DISTANCE)],
            ['CRACK_LENGTH', new Parameter('CRACK_LENGTH', LOG_NORMAL, 0, CENTIMETER, DISTANCE)],
            ['WALL_THICKNESS', new Parameter('WALL_THICKNESS', STATIC, 0, CENTIMETER, DISTANCE)],
            ['INNER_RADIUS', new Parameter('INNER_RADIUS', STATIC, 0, CENTIMETER, DISTANCE)],
            ['YIELD_STRESS', new Parameter('YIELD_STRESS', LOG_NORMAL, 0, CENTIMETER, DISTANCE)],
            ['OPERATING_PRESSURE', new Parameter('OPERATING_PRESSURE', LOG_NORMAL, 0, CENTIMETER, DISTANCE)]
        ]);
        this.scenario.type = 'SE_SURFACE_CRACK_STRAIGHT_PIPE';

        this.scenario.unitSystem = 'INTERNATIONAL';

        this.scenario.configuration = new Configuration();


        //Load data validation

        this.form = new FormGroup({
            'seed': new FormControl(this.scenario.configuration.seed, [
                Validators.required]),
            'precision': new FormControl(this.scenario.configuration.presicion, [
                Validators.required,
                Validators.min(1)])
        });
    }


    parameterChanged(event: Parameter) {
        this.scenario.parameters.set(event.code, event);
    }

    startScenarioCalculation() {

        let valid: boolean = true;
        console.log(this.scenario.parameters.values());

        let scenarioObj = {};
        this.scenario.parameters.forEach((value: Parameter, key: string) => {
            valid = valid && value.valid;

        });


        console.log(this.scenario.toObject());

        if (valid) {
            this.postAndRoute();
        }


    }

    private postAndRoute() {
        this.scenarioService.create(this.scenario.toObject())
            .then(res => {
                this.router.navigate(['/scenario', res]);
            });
    }
}


