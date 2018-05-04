import {Component, OnInit} from "@angular/core";
import {AuthGuard} from "../../service/auth_guard.service";
import {Material, MaterialProperty} from "../../entities/material";
import {
    DETERMINISTIC, FRACTURE_TOUGHNESS, INTERNATIONAL, PLASTIC_COLLAPSE,
    PRESSURE
} from "../utils/constant/constants";
import {MaterialService} from "../../service/material.service";
import {UserStorage} from "../../service/user-storage.service";
import {User} from "../../entities/User";

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

        this.materialService.getMaterialsForUser().then((materials) => {
            this.materials = materials;

        }).catch(() => {
            this.materials = [];
        });


    }


    deleteMaterial(id: String) {
        this.materialService.delete(id).then(() => {
            this.materials = this.materials.filter(m => m.id !== id);
        });

    }
}
