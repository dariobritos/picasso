import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonItem, Distribution, Parameter} from "../../../entities/scenario";
import {DISTANCE, LOG_NORMAL} from "../constant/constants";
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

    parameter1: number = 0;

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

        this.loadDistribution(this.parameter.type)
    }

    onChange() {
        this.parameter.valid = this.form.valid;
        this.changeParameter.emit(this.parameter);
    }


    typeChanges(typeValue) {
        this.parameter.type = typeValue;
        this.loadDistribution(typeValue);
        this.onChange();
    }

    paramChanges(typeValue) {
        this.loadDistribution(this.parameter.type);
        this.onChange();
    }



    private loadDistribution(typeValue) {
        if (LOG_NORMAL === typeValue) {
            let d = new Distribution();
            d.type = typeValue;
            let params: Array<CommonItem> = [];
            params.push(new CommonItem('VARIANCE', this.parameter1.toString()));
            d.parameters = params;
            this.parameter.distribution = d;
        } else {
            this.parameter.distribution = null;
            this.parameter1 = 0;
        }
    }
}
