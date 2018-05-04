import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./routing/app-routing.module";
import {AppComponent} from "./component/app/app.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ScenarioDetailComponent} from "./component/scenarios/detail/scenario-detail.component";
import {ScenariosComponent} from "./component/scenarios/scenarios.component";
import {ScenarioService} from "./service/scenario.service";
import {HomeComponent} from "./component/home/home.component";
import {SESCIASPComponent} from "./component/scenarios/SESCIASP/SESCIASP.component";
import {SIBComponent} from "./component/scenarios/CSBSTT/CSBSTT.component";
import {InputsModule} from "./component/utils/utils-module";
import {CommonModule} from "@angular/common";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {MaterialsComponent} from "./component/materials/materials.component";
import {ChartsModule} from "ng2-charts";
import {ErrorComponent} from "./component/error/error.component";
import {AuthGuard} from "./service/auth_guard.service";
import {UserStorage} from "./service/user-storage.service";
import {UserService} from "./service/user.service";
import {LoginService} from "./service/login.service";
import {SignupComponent} from "./component/register/signup.component";
import {InterceptorModule} from "./interceptors/interceptors.module";
import {MaterialService} from "./service/material.service";
import {MaterialDetailComponent} from "./component/materials/detail/material-detail.component";
import {LanguageService} from "./service/language.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        InputsModule,
        CommonModule,
        ChartsModule,
        InterceptorModule],
    declarations: [
        AppComponent,
        DashboardComponent,
        HomeComponent,
        ErrorComponent,
        ScenarioDetailComponent,
        MaterialDetailComponent,
        ScenariosComponent,
        SESCIASPComponent,
        SIBComponent,
        UserProfileComponent,
        SignupComponent,
        MaterialsComponent
    ],
    providers: [ScenarioService, MaterialService, AuthGuard,LanguageService, UserStorage, UserService, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
