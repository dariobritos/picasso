import {Component, OnInit} from '@angular/core';
import {ScenarioService} from "../../service/scenario.service";
import {Scenario} from "../../entities/scenario";


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Scenario[] = [];

  constructor(private heroService: ScenarioService) { }

  ngOnInit(): void {
    this.heroService.getScenarios()
      .then(heroes => this.heroes = heroes);
  }
}
