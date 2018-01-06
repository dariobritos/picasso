import {Component, OnInit} from '@angular/core';
import {Scenario, Configuration, Parameter} from "../../../entities/scenario";


@Component({
  selector: 'my-scenarios',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.css']
})
export class NewScenarioComponent implements OnInit {

  scenario: Scenario;

  scenarioTypes = ['SE_SURFACE_CRACK_STRAIGHT_PIPE'];

  ngOnInit(): void {
    this.scenario = new Scenario();
    this.scenario.parameters = new Map([
      ['CRACK_DEPTH', new Parameter('CRACK_DEPTH', 'VARIABLE')],
      ['CRACK_LENGTH', new Parameter('CRACK_LENGTH', 'VARIABLE')],
      ['WALL_THICKNESS', new Parameter('WALL_THICKNESS', 'STATIC')],
      ['FRACTURE_TOUGHNESS', new Parameter('FRACTURE_TOUGHNESS', 'VARIABLE')],
      ['INNER_RADIUS', new Parameter('INNER_RADIUS', 'STATIC')],
      ['YIELD_STRESS', new Parameter('YIELD_STRESS', 'VARIABLE')],
      ['OPERATING_PRESSURE', new Parameter('OPERATING_PRESSURE', 'VARIABLE')]
    ]);
    this.scenario.type = 'SE_SURFACE_CRACK_STRAIGHT_PIPE';

    this.scenario.configuration = new Configuration();

  }

  printScenario() {
    console.log(this.scenario);
  }

  parameterChanged(event: Parameter) {
    this.scenario.parameters.set(event.code, event);
    console.log(event);
  }
}


