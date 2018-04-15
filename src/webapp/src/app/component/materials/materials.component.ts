import {Component, OnInit} from "@angular/core";
import {AuthGuard} from "../../service/auth_guard.service";
import {Material, MaterialProperty} from "../../entities/material";
import {
    DETERMINISTIC, FRACTURE_TOUGHNESS, INTERNATIONAL, PLASTIC_COLLAPSE,
    PREASURE
} from "../utils/constant/constants";
import {MaterialService} from "../../service/material.service";

@Component({
    selector: 'materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

    materials: Array<Material> = [];

    constructor(private authGuard: AuthGuard, private materialService: MaterialService) {

    }


    ngOnInit(): void {
        this.authGuard.verifyLocation();

        let p1: MaterialProperty = new MaterialProperty(PLASTIC_COLLAPSE, DETERMINISTIC, null, 1.0, INTERNATIONAL, PREASURE);
        let p2: MaterialProperty = new MaterialProperty(FRACTURE_TOUGHNESS, DETERMINISTIC, null, 1.0, INTERNATIONAL, PREASURE);
        let properties: Array<MaterialProperty> = [p1, p2];
        let temp: Material = new Material( "xxx-xxx-xxx", "Material prueba 2", properties);
        temp.id='xxx-xxx-xxx';
        this.materials.push(temp);

        console.log(this.materials);


    }


    deleteMaterial(id: String) {
        this.materialService.delete(id).then(() => {
        });
        this.materials = this.materials.filter(m => m.id !== id);
    }
}
