import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {CalculationService} from "../../../service/calculation.service";
import {Calculation} from "../../../entities/calculation";

@Component({
  selector: 'calculation-detail',
  templateUrl: './calculation-detail.component.html',
  styleUrls: [ './calculation-detail.component.css' ]
})

export class CalculationDetailComponent {
  @Input()
  calculation: Calculation;

  constructor(
    private heroService: CalculationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getCalculation(+params.get('id')))
      .subscribe(hero => this.calculation = hero);
  }

  save(): void {
    this.heroService.update(this.calculation)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }


}
