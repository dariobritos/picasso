import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalculationsComponent} from "../component/calculation/calculations.component";
import {CalculationDetailComponent} from "../component/calculation/detail/calculation-detail.component";
import {DashboardComponent} from "../component/dashboard/dashboard.component";
import {HomeComponent} from "../component/home/home.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'calculation/:id', component: CalculationDetailComponent },
  { path: 'calculations',     component: CalculationsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
