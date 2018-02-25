import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Distribution, Parameter} from "../../../entities/scenario";
import {DISTANCE, LOGNORMAL, NORMAL, STATIC, VARIABLE} from "../constant/constants";
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

    international: boolean = true;
    unitedstates: boolean = false;

    distance: boolean;

    distributionType: string;
    parameter1: string;

    ngOnInit(): void {
        this.distance = (this.parameter.magnitude === DISTANCE);

        this.form = new FormGroup({
            'value': new FormControl(this.parameter.value, [
                Validators.required,
                Validators.min(0.000000001)]),
            'type': new FormControl(this.parameter.value, [
                Validators.required]),
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
