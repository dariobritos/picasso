import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import {Material, MaterialProperty} from "../../../entities/material";
import {MaterialService} from "../../../service/material.service";
import {
    DETERMINISTIC, FRACTURE_TOUGHNESS, INTERNATIONAL, MATERIAL_PROPERTIES, PLASTIC_COLLAPSE,
    PREASURE
} from "../../utils/constant/constants";
import {UserStorage} from "../../../service/user-storage.service";
import {fakeAsync} from "@angular/core/testing";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'material-detail',
    templateUrl: './material-detail.component.html',
    styleUrls: ['./material-detail.component.css']
})

export class MaterialDetailComponent implements OnInit, OnDestroy {


    id: string;
    material: Material;
    unitSystem: string;
    selectedMaterialProperty: string;
    materialPropertiesFiltered: Array<string> = [];

    loading: Boolean = false;

    constructor(private materialService: MaterialService,
                private route: ActivatedRoute, private router: Router, private userStorage: UserStorage) {
    }


    ngOnInit(): void {


        this.id = this.route.snapshot.params['id'];

        let userInfo = this.userStorage.getUserInfo();
        this.unitSystem = userInfo.preferences.unitSystem;

        if(!isNullOrUndefined(this.id)) {
            this.materialService.getMaterial(this.id).then((sc) => {
                this.material = sc;
            }).catch(
                () => {
                    let p1: MaterialProperty = new MaterialProperty(PLASTIC_COLLAPSE, DETERMINISTIC, null, 1.0, INTERNATIONAL, PREASURE);
                    let properties: Array<MaterialProperty> = [p1];
                    let temp: Material = new Material( "xxx-xxx-xxx", "Material prueba 2", properties);

                    this.material = temp;
                }
            );
        }else{
            this.material = new Material( userInfo.id, "",[]);
        }


        this.filterProperties();

    }

    private filterProperties() {
        this.materialPropertiesFiltered = MATERIAL_PROPERTIES.filter(mp => !this.material.properties.some(p => p.code === mp));
        if(this.materialPropertiesFiltered.length>0){
            this.selectedMaterialProperty=this.materialPropertiesFiltered[0];
        }
        console.log(this.materialPropertiesFiltered);
    }

    ngOnDestroy(): void {
    }

    propertyChanged(event: MaterialProperty) {
        let m = this.material.properties.find(item => item.code === event.code);
        let index = this.material.properties.indexOf(m);
        this.material.properties[index] = event;
    }


    addProperty() {

        console.log(this.selectedMaterialProperty);
        console.log(isNullOrUndefined(this.selectedMaterialProperty));

        let propertyCode = this.selectedMaterialProperty;
        let p1: MaterialProperty = new MaterialProperty(propertyCode, DETERMINISTIC, null, 1.0, INTERNATIONAL, PREASURE);
        this.material.properties.push(p1);


        this.filterProperties();
    }

    saveMaterial() {
        this.loading = true;
        this.materialService.update(this.material).then(() => {
            this.router.navigate(["/materials"]);
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });

    }

    addEnabled(): Boolean {
        return isNullOrUndefined(this.selectedMaterialProperty);
    }
}
