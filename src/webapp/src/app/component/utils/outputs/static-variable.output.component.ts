import {Component, Input, OnInit} from '@angular/core';
import {DETERMINISTIC, DISTANCE, LOGNORMAL, NORMAL, VARIABLE} from "../constant/constants";
import {Parameter} from "../../../entities/parameter";

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

    distributionType: string;
    parameter1: string = '0';

    ngOnInit(): void {
        this.distance = (this.parameter.magnitude === DISTANCE);
        this.loadDistribution();
    }


    private loadDistribution() {
        switch (this.parameter.type) {
            case DETERMINISTIC:
                this.distributionType = DETERMINISTIC;
                this.parameter1 = '0';
                break;
            case VARIABLE:
                this.distributionType = this.parameter.distribution.type;
                switch (this.parameter.distribution.type) {
                    case LOGNORMAL:
                        this.parameter1 = this.parameter.distribution.parameters.find(p => p.code === "SCALE").value;
                        break;
                    case NORMAL:
                        this.parameter1 = this.parameter.distribution.parameters.find(p => p.code === "VARIANCE").value;
                        break;
                }
                break;

        }

    }

}
