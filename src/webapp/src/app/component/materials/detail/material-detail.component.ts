import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ScenarioService} from "../../../service/scenario.service";
import 'rxjs/Rx';
import {Material} from "../../../entities/material";
import {MaterialService} from "../../../service/material.service";

@Component({
    selector: 'material-detail',
    templateUrl: './material-detail.component.html',
    styleUrls: ['./material-detail.component.css']
})

export class MaterialDetailComponent implements OnInit, OnDestroy {


    id: string;
    material: Material;

    constructor(private materialService: MaterialService,
                private route: ActivatedRoute) {
    }


    ngOnInit(): void {


        this.id = this.route.snapshot.params['id'];

        this.materialService.getMaterial(this.id).then((sc) => {
            this.material = sc;
        }).catch(
            () => {
                this.material = new Material()
            }
        );

    }

    ngOnDestroy(): void {
    }


}
