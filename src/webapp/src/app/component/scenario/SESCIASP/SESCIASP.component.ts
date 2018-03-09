import {Component, OnInit} from '@angular/core';
import {CommonItem, Parameter, Scenario} from "../../../entities/scenario";
import {
    CENTIMETER,
    DISTANCE, FRACTURE_TOUGHNESS, INCH, INTERNATIONAL,
    LOGNORMAL, MEGAPASCAL, MEGAPASCAL_METER_0_5, MILLIMETER, NEWTON_MILLIMETER_2,
    NORMAL, PREASURE,
    SE_SURFACE_CRACK_STRAIGHT_PIPE,
    STATIC,
    VARIABLE
} from "../../utils/constant/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ScenarioService} from "../../../service/scenario.service";
import {AuthGuard} from "../../../service/auth_guard.service";
import {UserStorage} from "../../../service/user-storage.service";


@Component({
    selector: 'my-scenarios',
    templateUrl: './SESCIASP.component.html',
    styleUrls: ['./SESCIASP.component.css']
})
export class SESCIASPComponent implements OnInit{


    scenario: Scenario;
    seed: number = (new Date()).getTime();
    precision: number = 100000;

    scenarioType = SE_SURFACE_CRACK_STRAIGHT_PIPE;

    form: FormGroup;

    constructor(private router: Router,
                private scenarioService: ScenarioService,
                private authGuard: AuthGuard,
                private userStorage:UserStorage) {

    }

    ngOnInit(): void {

        this.authGuard.verifyLocation();

        let unitSystem = this.userStorage.getUserInfo().preferences.unitSystem;

        this.scenario = new Scenario();
        this.scenario.parameters = [
            new Parameter('CRACK_DEPTH', VARIABLE, LOGNORMAL, 0.1, unitSystem, DISTANCE),
            new Parameter('CRACK_LENGTH', VARIABLE, LOGNORMAL, 0.1, unitSystem, DISTANCE),
            new Parameter('WALL_THICKNESS', STATIC, null, 0.1, unitSystem, DISTANCE),
            new Parameter('INNER_RADIUS', STATIC,null, 0.1, unitSystem, DISTANCE),
            new Parameter('FRACTURE_TOUGHNESS', VARIABLE,NORMAL, 0.1, unitSystem, FRACTURE_TOUGHNESS),
            new Parameter('YIELD_STRESS', VARIABLE,NORMAL, 2, unitSystem, PREASURE),
            new Parameter('PLASTIC_COLLAPSE', VARIABLE,NORMAL, 1, unitSystem, PREASURE),
            new Parameter('OPERATING_PRESSURE', VARIABLE,NORMAL, 0.1, unitSystem, PREASURE)];


        this.scenario.type = 'SE_SURFACE_CRACK_STRAIGHT_PIPE';

        this.scenario.unitSystem = unitSystem;


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


