import {Component, OnInit} from '@angular/core';
import {Calculation, Configuration, Parameter} from "../../../entities/calculation";


@Component({
  selector: 'my-calculations',
  templateUrl: './new-calculation.component.html',
  styleUrls: ['./new-calculation.component.css']
})
export class NewCalculationComponent implements OnInit {

  calculation: Calculation;

  calculationTypes = ['SE_SURFACE_CRACK_STRAIGHT_PIPE'];

  ngOnInit(): void {
    this.calculation = new Calculation();
    this.calculation.parameters = new Map([
      ['CRACK_DEPTH', new Parameter('CRACK_DEPTH', 'VARIABLE')],
      ['CRACK_LENGTH', new Parameter('CRACK_LENGTH', 'VARIABLE')],
      ['WALL_THICKNESS', new Parameter('WALL_THICKNESS', 'STATIC')],
      ['FRACTURE_TOUGHNESS', new Parameter('FRACTURE_TOUGHNESS', 'VARIABLE')],
      ['INNER_RADIUS', new Parameter('INNER_RADIUS', 'STATIC')],
      ['YIELD_STRESS', new Parameter('YIELD_STRESS', 'VARIABLE')],
      ['OPERATING_PRESSURE', new Parameter('OPERATING_PRESSURE', 'VARIABLE')]
    ]);
    this.calculation.type = 'SE_SURFACE_CRACK_STRAIGHT_PIPE';

    this.calculation.configuration = new Configuration();

  }

  printCalculation() {
    console.log(this.calculation);
  }

  parameterChanged(event: Parameter) {
    this.calculation.parameters.set(event.code, event);
    console.log(event);
  }
}


