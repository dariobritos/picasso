import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {ScenarioService} from "../../../service/scenario.service";
import {Scenario} from "../../../entities/scenario";

@Component({
  selector: 'scenario-detail',
  templateUrl: './scenario-detail.component.html',
  styleUrls: [ './scenario-detail.component.css' ]
})

export class ScenarioDetailComponent {
  @Input()
  scenario: Scenario;

  constructor(
    private scenarioService: ScenarioService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.scenarioService.getScenario(params.get('id')))
      .subscribe(scenario => this.scenario = scenario);
  }

  save(): void {
    this.scenarioService.update(this.scenario)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }


}
