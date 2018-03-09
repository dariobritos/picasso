import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Distribution, Parameter} from "../../../entities/scenario";
import {
    DISTANCE, FRACTURE_TOUGHNESS, INTERNATIONAL, INTERNATIONAL_UNITS, LOGNORMAL, NORMAL, PREASURE, STATIC, UNITEDSTATES,
    UNITEDSTATES_UNITS,
    VARIABLE
} from "../constant/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'static-variable-input',
    templateUrl: 'static-variable.input.component.html',
    styleUrls: ['static-variable.input.component.css']
})
export class StaticVariableInputComponent implements OnInit {

    @Input()
    parameter: Parameter;

    form: FormGroup;

    @Output()
    changeParameter = new EventEmitter<Parameter>();

    internationalUnits = INTERNATIONAL_UNITS;
    unitedStatesUnits = UNITEDSTATES_UNITS;

    international: boolean = true;
    unitedstates: boolean = false;

    distance: boolean;
    preasure: boolean;
    fractureToughness: boolean;



    distributionType: string;
    parameter1: string;

    ngOnInit(): void {

        this.international = (this.parameter.unitSystem===INTERNATIONAL);
        this.unitedstates = (this.parameter.unitSystem===UNITEDSTATES);

        this.distance = (this.parameter.magnitude === DISTANCE);
        this.preasure = (this.parameter.magnitude === PREASURE);
        this.fractureToughness = (this.parameter.magnitude === FRACTURE_TOUGHNESS);

        this.form = new FormGroup({
            'value': new FormControl(this.parameter.value, [
                Validators.required,
                Validators.min(0.000000001)]),
            'type': new FormControl(this.parameter.value, [
                Validators.required]),
            'intUnit': new FormControl(this.parameter.value, []),
            'usUnit': new FormControl(this.parameter.value, []),
            'parameter-1': new FormControl(this.parameter.value, [
                Validators.required])
        });

        this.parameter.valid = this.form.valid;

        this.distributionType = (this.parameter.type === STATIC) ? STATIC : this.parameter.distribution.type;
        this.parameter1 = (this.parameter.type === STATIC) ? '0' : this.parameter.distribution.parameters[0].value;

    }

    onChange() {
        this.parameter.valid = this.form.valid;
        this.changeParameter.emit(this.parameter);
        console.log(this.parameter);
    }


    typeChanges(type) {
        this.parameter.type = (type === STATIC) ? STATIC : VARIABLE;
        this.loadDistribution(type);
        this.onChange();
    }

    paramChanges() {
        this.loadDistribution(this.distributionType);
        this.onChange();
    }


    private loadDistribution(type) {
        switch (type) {
            case NORMAL:
            case LOGNORMAL:
                let d = new Distribution(type, this.parameter1);
                this.parameter.distribution = d;
                break;
            default:
                this.parameter.distribution = null;
                this.parameter1 = '0';
        }

    }
}
