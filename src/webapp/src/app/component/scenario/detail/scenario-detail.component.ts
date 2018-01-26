import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {ScenarioService} from "../../../service/scenario.service";
import {Scenario} from "../../../entities/scenario";

@Component({
    selector: 'scenario-detail',
    templateUrl: './scenario-detail.component.html',
    styleUrls: ['./scenario-detail.component.css']
})

export class ScenarioDetailComponent implements OnInit {

    scenario: Scenario;

    constructor(private scenarioService: ScenarioService,
                private route: ActivatedRoute,
                private location: Location) {
    }


    ngOnInit(): void {
        console.log(this.route.paramMap);
        this.route.params
            .switchMap((params: Params) => this.scenarioService.getScenario(params['id']))
            .subscribe(scenario => this.scenario = scenario);
        console.log(this.scenario);
    }

    public doughnutChartLabels: string[] = ['Failure probability'];
    public doughnutChartData: number[] = [60, 40];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartOptions: any = {
        legend: {
            display: false}
    };
    public doughnutColorsType: any[] = [{
        backgroundColor: ['#15950d', '#ff0015']
    }];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    private getParameter(code: string) {
        return this.scenario.parameters.find(p => p.code === code);
    }

    goBack(): void {
        this.location.back();
    }


}
