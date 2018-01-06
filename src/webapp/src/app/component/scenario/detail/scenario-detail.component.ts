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
    private heroService: ScenarioService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getScenario(+params.get('id')))
      .subscribe(hero => this.scenario = hero);
  }

  save(): void {
    this.heroService.update(this.scenario)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }


}
