import {Component, Inject, OnInit} from '@angular/core';
import {Scenario, CommonItem, Parameter} from "../../../entities/scenario";
import {
    CENTIMETER, DISTANCE, INTERNATIONAL, LOGNORMAL, NORMAL, SE_SURFACE_CRACK_STRAIGHT_PIPE, SIMPLE_IRON_BAR, STATIC,
    VARIABLE
} from "../../utils/constant/constants";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ScenarioService} from "../../../service/scenario.service";


@Component({
    selector: 'my-scenarios',
    templateUrl: './SIB.component.html',
    styleUrls: ['./SIB.component.css']
})
export class SIBComponent {

    scenario: Scenario;
    seed: number = (new Date()).getTime();
    precision: number = 100000;

    scenarioType = SIMPLE_IRON_BAR;

    form: FormGroup;

    constructor(private router: Router,
                private scenarioService: ScenarioService) {
        this.scenario = new Scenario();
        this.scenario.parameters = [
            new Parameter('BAR_LOAD', VARIABLE, LOGNORMAL, 0.1, INTERNATIONAL, DISTANCE),
            new Parameter('BAR_STRENGTH', VARIABLE, LOGNORMAL, 0.1, INTERNATIONAL, DISTANCE)
        ]; 

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
        let confSeed: CommonItem = new CommonItem('SEED', this.seed.toString());
        let confPrecision: CommonItem = new CommonItem('PRECISION', this.precision.toString());


        this.scenario.configuration.push(confSeed);
        this.scenario.configuration.push(confPrecision);
    }
}


