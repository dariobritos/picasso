import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';



import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./routing/app-routing.module";
import {AppComponent} from "./component/app/app.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {CalculationDetailComponent} from "./component/calculation/detail/calculation-detail.component";
import {CalculationsComponent} from "./component/calculation/calculations.component";
import {CalculationService} from "./service/calculation.service";
import {HomeComponent} from "./component/home/home.component";
import {NavbarComponent} from "./component/utils/navbar/navbar.component";
import {NewCalculationComponent} from "./component/calculation/new/new-calculation.component";
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
    CalculationDetailComponent,
    CalculationsComponent,
    NewCalculationComponent,
    UserProfileComponent,
    UserProfileComponent,
    MaterialsComponent
  ],
  providers: [ CalculationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
