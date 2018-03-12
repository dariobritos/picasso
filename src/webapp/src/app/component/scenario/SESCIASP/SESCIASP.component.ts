import {Component, OnInit} from '@angular/core';
import {CommonItem, Parameter, Scenario} from "../../../entities/scenario";
import {
    DISTANCE,
    FRACTURE_TOUGHNESS,
    LOGNORMAL,
    NORMAL,
    PREASURE,
    SE_SURFACE_CRACK_STRAIGHT_PIPE,
    DETERMINISTIC,
    VARIABLE, PLASTIC_COLLAPSE
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
export class SESCIASPComponent implements OnInit {


    scenario: Scenario;
    seed: number = (new Date()).getTime();
    precision: number = 100000;

    scenarioType = SE_SURFACE_CRACK_STRAIGHT_PIPE;

    form: FormGroup;
    loading: boolean;

    unitSystem: string;

    constructor(private router: Router,
                private scenarioService: ScenarioService,
                private authGuard: AuthGuard,
                private userStorage: UserStorage) {

    }

    ngOnInit(): void {

        this.authGuard.verifyLocation();
        this.loading = false;

        this.unitSystem = this.userStorage.getUserInfo().preferences.unitSystem;

        this.scenario = new Scenario();
        this.scenario.parameters = [
            new Parameter('CRACK_DEPTH', VARIABLE, LOGNORMAL, 0.1, this.unitSystem, DISTANCE),
            new Parameter('CRACK_LENGTH', VARIABLE, LOGNORMAL, 0.1, this.unitSystem, DISTANCE),
            new Parameter('WALL_THICKNESS', DETERMINISTIC, null, 0.1, this.unitSystem, DISTANCE),
            new Parameter('INNER_RADIUS', DETERMINISTIC, null, 0.1, this.unitSystem, DISTANCE),
            new Parameter('FRACTURE_TOUGHNESS', VARIABLE, NORMAL, 0.1, this.unitSystem, FRACTURE_TOUGHNESS),
            new Parameter('YIELD_STRESS', VARIABLE, NORMAL, 2, this.unitSystem, PREASURE),
            new Parameter('PLASTIC_COLLAPSE', DETERMINISTIC, null, 1, this.unitSystem, PLASTIC_COLLAPSE),
            new Parameter('OPERATING_PRESSURE', VARIABLE, NORMAL, 0.1, this.unitSystem, PREASURE)];


        this.scenario.type = 'SE_SURFACE_CRACK_STRAIGHT_PIPE';

        this.scenario.unitSystem = this.unitSystem;


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
        this.scenario.parameters = this.scenario.parameters.filter(item => item.code !== event.code);
        this.scenario.parameters.push(event);
    }

    startScenarioCalculation() {

        let valid: boolean = true;
        this.scenario.parameters.forEach((value: Parameter) => {
            valid = valid && value.valid;
        });

        this.loadScenarioConfiguration();

        if (valid) {
            this.postAndRoute();
        }


    }

    private getParameter(code: string) {
        return this.scenario.parameters.find(p => p.code === code);
    }

    private postAndRoute() {
        this.loading = true;
        this.scenarioService.create(this.scenario)
            .then(res => {
                this.router.navigate(['/scenario', res]);
                this.loading = false;
            }).catch(() => {
            this.loading = false;
        });
    }

    private loadScenarioConfiguration() {
        let confSeed: CommonItem = new CommonItem('SEED', this.seed.toString());
        let confPrecision: CommonItem = new CommonItem('PRECISION', this.precision.toString());


        this.scenario.configuration.push(confSeed);
        this.scenario.configuration.push(confPrecision);
    }
}


