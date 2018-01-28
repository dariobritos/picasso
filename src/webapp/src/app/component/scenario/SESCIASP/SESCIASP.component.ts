import {Component, Inject, OnInit} from '@angular/core';
import {Scenario, ConfigurationItem, Parameter} from "../../../entities/scenario";
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
    seed: number = (new Date()).getTime();
    precision: number = 100000;

    scenarioType = SE_SURFACE_CRACK_STRAIGHT_PIPE;

    form: FormGroup;

    constructor(private router: Router,
                private scenarioService: ScenarioService) {
        this.scenario = new Scenario();
        this.scenario.parameters = [
            new Parameter('CRACK_DEPTH', LOG_NORMAL, 0, CENTIMETER, DISTANCE),
            new Parameter('CRACK_LENGTH', LOG_NORMAL, 0, CENTIMETER, DISTANCE),
            new Parameter('WALL_THICKNESS', STATIC, 0, CENTIMETER, DISTANCE),
            new Parameter('INNER_RADIUS', STATIC, 0, CENTIMETER, DISTANCE),
            new Parameter('YIELD_STRESS', LOG_NORMAL, 0, CENTIMETER, DISTANCE),
            new Parameter('OPERATING_PRESSURE', LOG_NORMAL, 0, CENTIMETER, DISTANCE)];


        this.scenario.type = 'SE_SURFACE_CRACK_STRAIGHT_PIPE';

        this.scenario.unitSystem = 'INTERNATIONAL';




        //Load data validation

        this.form = new FormGroup({
            'seed': new FormControl(this.seed, [
                Validators.required]),
            'precision': new FormControl(this.precision, [
                Validators.required,
                Validators.min(1)]),
            'comments': new FormControl(this.scenario.comments, [])
        });
    }


    parameterChanged(event: Parameter) {
        this.scenario.parameters.push(event);
    }

    startScenarioCalculation() {

        let valid: boolean = true;
        this.scenario.parameters.forEach((value: Parameter) => {
            valid = valid && value.valid;
        });

        this.loadScenarioConfiguration();

        console.log(this.scenario);

        if (valid) {
            this.postAndRoute();
        }


    }

    private getParameter(code: string) {
        return this.scenario.parameters.find(p => p.code === code);
    }

    private postAndRoute() {
        this.scenarioService.create(this.scenario)
            .then(res => {
                this.router.navigate(['/scenario', res]);
            });
    }

    private loadScenarioConfiguration() {
        let confSeed: ConfigurationItem = new ConfigurationItem();
        confSeed.code = 'SEED';
        confSeed.value = this.seed.toString();

        let confPrecision: ConfigurationItem = new ConfigurationItem();
        confPrecision.code= 'PRECISION';
        confPrecision.value= this.precision.toString();

        this.scenario.configuration.push(confSeed);
        this.scenario.configuration.push(confPrecision);
    }
}


