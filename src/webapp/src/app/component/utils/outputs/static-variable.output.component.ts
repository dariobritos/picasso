import {Component, Input, OnInit} from '@angular/core';
import {Parameter} from "../../../entities/scenario";
import {DISTANCE, LOG_NORMAL} from "../constant/constants";

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

    parameter1: string = '0';

    ngOnInit(): void {
        this.distance = (this.parameter.magnitude === DISTANCE);
        this.loadDistribution();
    }


    private loadDistribution() {
        if (LOG_NORMAL === this.parameter.type) {
            this.parameter1 = this.parameter.distribution.parameters.find(p => p.code === "VARIANCE").value;
        } else {
            this.parameter1 = '0';
        }
    }

}
