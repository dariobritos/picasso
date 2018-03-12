import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Distribution, Parameter} from "../../../entities/scenario";
import {
    DISTANCE, FRACTURE_TOUGHNESS, INTERNATIONAL, INTERNATIONAL_UNITS, LOGNORMAL, NORMAL, PREASURE, DETERMINISTIC, UNITEDSTATES,
    UNITEDSTATES_UNITS,
    VARIABLE
} from "../constant/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'static-input',
    templateUrl: 'static.input.component.html',
    styleUrls: ['static.input.component.css']
})
export class StaticInputComponent implements OnInit {

    @Input()
    parameter: Parameter;

    @Input()
    staticField: Boolean;

    @Input()
    unitSystem: String;

    form: FormGroup;

    @Output()
    changeParameter = new EventEmitter<Parameter>();


    ngOnInit(): void {


        this.form = new FormGroup({
            'value': new FormControl(this.parameter.value, [
                Validators.required,
                Validators.min(0.000000001)])
        });

        if(this.staticField) {
            this.form.controls['value'].disable();
        }

        this.parameter.valid = this.form.valid;

    }

    onChange() {
        this.parameter.valid = this.form.valid;
        this.changeParameter.emit(this.parameter);
    }



}
