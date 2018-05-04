import {Component, OnInit} from '@angular/core';
import {CommonItem, Scenario} from "../../../entities/scenario";
import {
    DISTANCE, LOGNORMAL, CIRCULAR_SECTION_BAR_SUBJECTED_TO_TRACTION, VARIABLE,
    YIELD_STRESS, FORCE, NORMAL, PRESSURE, DETERMINISTIC
} from "../../utils/constant/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ScenarioService} from "../../../service/scenario.service";
import {AuthGuard} from "../../../service/auth_guard.service";
import {UserStorage} from "../../../service/user-storage.service";
import {Parameter} from "../../../entities/parameter";


@Component({
    selector: 'my-scenarios',
    templateUrl: './CSBSTT.component.html',
    styleUrls: ['./CSBSTT.component.css']
})
export class SIBComponent implements OnInit {


    scenario: Scenario;
    seed: number = (new Date()).getTime();
    precision: number = 100000;

    scenarioType = CIRCULAR_SECTION_BAR_SUBJECTED_TO_TRACTION;

    form: FormGroup;

    unitSystem: string;

    constructor(private router: Router,
                private scenarioService: ScenarioService,
                private authGuard: AuthGuard,
                private userStorage: UserStorage) {

    }

    ngOnInit(): void {


        this.authGuard.verifyLocation();

        this.unitSystem = this.userStorage.getUserInfo().preferences.unitSystem;


        this.scenario = new Scenario();
        this.scenario.parameters = [
            new Parameter('BAR_LOAD', VARIABLE, LOGNORMAL, 0.1, this.unitSystem, FORCE),
            new Parameter('YIELD_STRESS', VARIABLE, NORMAL, 2, this.unitSystem, PRESSURE),
            new Parameter('BAR_DIAMETER', DETERMINISTIC, null, 0.1, this.unitSystem, DISTANCE)
        ];

        this.scenario.type = CIRCULAR_SECTION_BAR_SUBJECTED_TO_TRACTION;
        this.scenario.unitSystem=this.unitSystem;


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

    getParameter(code: string) {
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


