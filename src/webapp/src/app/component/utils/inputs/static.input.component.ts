import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Parameter} from "../../../entities/parameter";
import {DISTANCE, FORCE, FRACTURE_TOUGHNESS, INTERNATIONAL, PRESSURE, UNITEDSTATES} from "../constant/constants";

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


    international: boolean;
    unitedstates: boolean;
    distance: boolean;
    pressure: boolean;
    force: boolean;
    fractureToughness: boolean;


    ngOnInit(): void {
        this.international = (this.unitSystem === INTERNATIONAL);
        this.unitedstates = (this.unitSystem === UNITEDSTATES);

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

        if (this.staticField) {
            this.form.controls['value'].disable();
        }

        this.parameter.valid = this.form.valid;

    }

    onChange() {
        this.parameter.valid = this.form.valid;
        this.changeParameter.emit(this.parameter);
    }


}
