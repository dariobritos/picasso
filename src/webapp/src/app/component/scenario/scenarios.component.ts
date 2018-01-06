import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {ScenarioService} from "../../service/scenario.service";
import {Scenario} from "../../entities/scenario";

@Component({
  selector: 'my-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
  providers: [ScenarioService]
})
export class ScenariosComponent implements OnInit {
  scenario: Scenario[];
  selectedScenario: Scenario;

  constructor(
    private router: Router,
    private scenarioService: ScenarioService) { }

  getScenarios(): void {
    this.scenarioService.getScenarios().then(scenario => {this.scenario = scenario;});
  }

  ngOnInit(): void {
    this.getScenarios();
  }

  onSelect(hero: Scenario): void {
    this.selectedScenario = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/scenario', this.selectedScenario.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.scenarioService.create(name)
      .then(scenario => {
        this.scenario.push(scenario);
        this.selectedScenario = null;
      });
  }
}


