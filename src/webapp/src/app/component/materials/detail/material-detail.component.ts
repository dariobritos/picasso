import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import {Material, MaterialProperty} from "../../../entities/material";
import {MaterialService} from "../../../service/material.service";
import {
    DETERMINISTIC, FRACTURE_TOUGHNESS, INTERNATIONAL, MATERIAL_PROPERTIES, PLASTIC_COLLAPSE,
    PREASURE, YIELD_STRESS
} from "../../utils/constant/constants";
import {UserStorage} from "../../../service/user-storage.service";
import {fakeAsync} from "@angular/core/testing";
import {isNullOrUndefined} from "util";
import {AuthGuard} from "../../../service/auth_guard.service";

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

    newMaterial: Boolean = false;
    loading: Boolean = false;

    constructor(private materialService: MaterialService,
                private route: ActivatedRoute, private router: Router, private userStorage: UserStorage, private authGuard: AuthGuard) {
    }


    ngOnInit(): void {

        this.authGuard.verifyLocation();


        this.id = this.route.snapshot.params['id'];

        let userInfo = this.userStorage.getUserInfo();
        this.unitSystem = userInfo.preferences.unitSystem;

        if (!isNullOrUndefined(this.id)) {
            this.materialService.getMaterial(this.id).then((sc) => {
                this.material = sc;
                this.filterProperties();
            }).catch(
                () => {

                }
            );
        } else {
            this.material = new Material(userInfo.id, "", []);
            this.newMaterial = true;
            this.filterProperties();
        }


    }

    private filterProperties() {
        this.materialPropertiesFiltered = MATERIAL_PROPERTIES.filter(mp => !this.material.properties.some(p => p.code === mp));
        if (this.materialPropertiesFiltered.length > 0) {
            this.selectedMaterialProperty = this.materialPropertiesFiltered[0];
        }
    }

    ngOnDestroy(): void {
    }

    propertyChanged(event: MaterialProperty) {
        let m = this.material.properties.find(item => item.code === event.code);
        let index = this.material.properties.indexOf(m);
        this.material.properties[index] = event;
    }


    addProperty() {

        let propertyCode = this.selectedMaterialProperty;

        let p1: MaterialProperty;
        switch (propertyCode) {
            case FRACTURE_TOUGHNESS:
                p1 = new MaterialProperty(FRACTURE_TOUGHNESS, DETERMINISTIC, null, 0.1, this.unitSystem, FRACTURE_TOUGHNESS);
                break;
            case YIELD_STRESS:
                p1 = new MaterialProperty(YIELD_STRESS, DETERMINISTIC, null, 2, this.unitSystem, PREASURE);
                break;
            case PLASTIC_COLLAPSE:
                p1 = new MaterialProperty(PLASTIC_COLLAPSE, DETERMINISTIC, null, 1, this.unitSystem, PLASTIC_COLLAPSE);
                break;
        }
        this.material.properties.push(p1);

        this.filterProperties();
    }

    saveMaterial() {
        this.loading = true;
        if (this.newMaterial) {
            this.materialService.create(this.material).then(() => {
                this.router.navigate(["/materials"]);
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
        else {
            this.materialService.update(this.material).then(() => {
                this.router.navigate(["/materials"]);
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }

    addEnabled(): Boolean {
        return isNullOrUndefined(this.selectedMaterialProperty);
    }

    getProperty(code: string) {
        return this.material.properties.find(p => p.code === code);
    }

    validMaterial(): Boolean {
        return !isNullOrUndefined(this.material) && this.material.properties.length > 0 && !isNullOrUndefined(this.material.name) && this.material.name !== ""
    }
}
