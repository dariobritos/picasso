import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {ScenarioService} from "../../../service/scenario.service";
import {Scenario} from "../../../entities/scenario";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'scenario-detail',
    templateUrl: './scenario-detail.component.html',
    styleUrls: ['./scenario-detail.component.css']
})

export class ScenarioDetailComponent implements OnInit, OnDestroy {


    id: string;
    scenario: Scenario;

    constructor(private scenarioService: ScenarioService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    subscription: Subscription;


    failurePercentage: number = 0;


    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.subscription = Observable.interval(500).switchMap(() => this.scenarioService.getScenario(this.id))
            .subscribe((data) => {
                this.scenario = data;
                if (!isNullOrUndefined(data.output)) {
                    //Cuando el scenario tiene output ya no consultamos su estado
                    this.processOutput();
                    this.subscription.unsubscribe();
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public doughnutChartLabels: string[] = ['Non failure probability', 'Failure probability'];
    public doughnutChartData: number[] = [100-this.failurePercentage, this.failurePercentage];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartOptions: any = {
        legend: {
            display: false
        }
    };
    public doughnutColorsType: any[] = [{
        backgroundColor: ['#15950d', '#ff0015']
    }];

    // events
    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    public getParameter(code: string) {
        return this.scenario.parameters.find(p => p.code === code);
    }

    public getConfiguration(code: string) {
        return this.scenario.configuration.find(p => p.code === code);
    }

    goBack(): void {
        this.location.back();
    }


    private processOutput() {
        let fProb: number = +this.scenario.output.find(o => o.code === 'FAILURE_PROBABILITY').value;

        this.failurePercentage = Math.round(fProb * 100);
        this.doughnutChartData = [100-this.failurePercentage, this.failurePercentage];
    }
}
