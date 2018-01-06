import {Component, OnInit} from '@angular/core';
import {CalculationService} from "../../service/calculation.service";
import {Calculation} from "../../entities/calculation";


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Calculation[] = [];

  constructor(private heroService: CalculationService) { }

  ngOnInit(): void {
    this.heroService.getCalculations()
      .then(heroes => this.heroes = heroes);
  }
}
