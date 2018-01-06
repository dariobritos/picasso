import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {CalculationService} from "../../service/calculation.service";
import {Calculation} from "../../entities/calculation";

@Component({
  selector: 'my-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css'],
  providers: [CalculationService]
})
export class CalculationsComponent implements OnInit {
  calculation: Calculation[];
  selectedCalculation: Calculation;

  constructor(
    private router: Router,
    private calculationService: CalculationService) { }

  getCalculations(): void {
    this.calculationService.getCalculations().then(calculation => {this.calculation = calculation;});
  }

  ngOnInit(): void {
    this.getCalculations();
  }

  onSelect(hero: Calculation): void {
    this.selectedCalculation = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/calculation', this.selectedCalculation.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.calculationService.create(name)
      .then(calculation => {
        this.calculation.push(calculation);
        this.selectedCalculation = null;
      });
  }
}


