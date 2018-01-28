import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'error',
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.css']
})
export class ErrorComponent implements OnInit {


    errorCode: number;

    constructor(private route: ActivatedRoute){
        this.errorCode = +this.route.snapshot.params['code'] ;
    }

    ngOnInit(): void {
    }
}
