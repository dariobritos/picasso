import {Component, Input, OnInit} from '@angular/core';
import {Parameter} from "../../../entities/scenario";
import {DISTANCE} from "../constant/constants";

@Component({
    selector: 'static-variable-output',
    templateUrl: 'static-variable.output.component.html',
    styleUrls: ['static-variable.output.component.css']
})
export class StaticVariableOutputComponent implements OnInit {


    @Input()
    parameter: Parameter;

    international: boolean = true;
    unitedstates: boolean = false;

    distance: boolean;

    parameter1: number = 0;

    ngOnInit(): void {
        this.distance = (this.parameter.magnitude === DISTANCE);
    }




}
