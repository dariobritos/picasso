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
import {NavbarComponent} from "./component/navbar/navbar.component";
import {NewCalculationComponent} from "./component/calculation/new/new-calculation.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    CalculationDetailComponent,
    CalculationsComponent,
    NewCalculationComponent
  ],
  providers: [ CalculationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
