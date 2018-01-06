
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Parameter} from "../../../entities/scenario";

@Component({
  selector: 'static-variable-input',
  templateUrl: 'static-variable.input.component.html',
  styleUrls: ['static-variable.input.component.css']
})
export class StaticVariableInputComponent {

  @Input()
  parameter: Parameter;


  @Output()
  changeParameter = new EventEmitter<Parameter>();

  onChange(){

    this.changeParameter.emit(this.parameter);
  }




}
