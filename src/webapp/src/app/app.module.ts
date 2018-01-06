import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';



import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./routing/app-routing.module";
import {AppComponent} from "./component/app/app.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ScenarioDetailComponent} from "./component/scenario/detail/scenario-detail.component";
import {ScenariosComponent} from "./component/scenario/scenarios.component";
import {ScenarioService} from "./service/scenario.service";
import {HomeComponent} from "./component/home/home.component";
import {NavbarComponent} from "./component/utils/navbar/navbar.component";
import {NewScenarioComponent} from "./component/scenario/new/new-scenario.component";
import {InputsModule} from "./component/utils/utils-module";
import {CommonModule} from "@angular/common";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {MaterialsComponent} from "./component/materials/materials.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InputsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ScenarioDetailComponent,
    ScenariosComponent,
    NewScenarioComponent,
    UserProfileComponent,
    UserProfileComponent,
    MaterialsComponent
  ],
  providers: [ ScenarioService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
