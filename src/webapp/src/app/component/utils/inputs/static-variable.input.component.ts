import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    DETERMINISTIC,
    DISTANCE, FORCE,
    FRACTURE_TOUGHNESS,
    INTERNATIONAL,
    INTERNATIONAL_UNITS,
    LOGNORMAL,
    NORMAL,
    PRESSURE,
    UNITEDSTATES,
    UNITEDSTATES_UNITS,
    VARIABLE
} from "../constant/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Distribution, Parameter} from "../../../entities/parameter";

@Component({
    selector: 'static-variable-input',
    templateUrl: 'static-variable.input.component.html',
    styleUrls: ['static-variable.input.component.css']
})
export class StaticVariableInputComponent implements OnInit {

    @Input()
    parameter: Parameter;

    @Input()
    staticField: Boolean;



    @Input()
    unitSystem: String;

    form: FormGroup;

    @Output()
    changeParameter = new EventEmitter<Parameter>();

    internationalUnits = INTERNATIONAL_UNITS;
    unitedStatesUnits = UNITEDSTATES_UNITS;

    international: boolean = true;
    unitedstates: boolean = false;

    distance: boolean;
    pressure: boolean;
    force: boolean;
    fractureToughness: boolean;



    distributionType: string;
    parameter1: string;

    ngOnInit(): void {

        this.international = (this.unitSystem===INTERNATIONAL);
        this.unitedstates = (this.unitSystem===UNITEDSTATES);

        this.distance = (this.parameter.magnitude === DISTANCE);
        this.pressure = (this.parameter.magnitude === PRESSURE);
        this.force = (this.parameter.magnitude === FORCE);
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

        if(this.staticField) {
            this.form.controls['value'].disable();
            this.form.controls['type'].disable();
            this.form.controls['intUnit'].disable();
            this.form.controls['usUnit'].disable();
            this.form.controls['parameter-1'].disable();
        }

        this.parameter.valid = this.form.valid;

        this.distributionType = (this.parameter.type === DETERMINISTIC) ? DETERMINISTIC : this.parameter.distribution.type;
        this.parameter1 = (this.parameter.type === DETERMINISTIC) ? '0' : this.parameter.distribution.parameters[0].value;

    }

    onChange() {
        this.parameter.valid = this.form.valid;
        this.changeParameter.emit(this.parameter);
    }


    typeChanges(type) {
        this.parameter.type = (type === DETERMINISTIC) ? DETERMINISTIC : VARIABLE;
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
