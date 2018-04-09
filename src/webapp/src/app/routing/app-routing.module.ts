import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScenariosComponent} from "../component/scenarios/scenarios.component";
import {ScenarioDetailComponent} from "../component/scenarios/detail/scenario-detail.component";
import {DashboardComponent} from "../component/dashboard/dashboard.component";
import {HomeComponent} from "../component/home/home.component";
import {SESCIASPComponent} from "../component/scenarios/SESCIASP/SESCIASP.component";
import {SIBComponent} from "../component/scenarios/SIB/SIB.component";
import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import {MaterialsComponent} from "../component/materials/materials.component";
import {ErrorComponent} from "../component/error/error.component";
import {SignupComponent} from "../component/register/signup.component";
import {AuthGuard} from "../service/auth_guard.service";
import {MaterialDetailComponent} from "../component/materials/detail/material-detail.component";


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'scenario/:id', component: ScenarioDetailComponent},
    {path: 'material/:id', component: MaterialDetailComponent},
    {path: 'scenarios', component: ScenariosComponent},
    {path: 'new/semi-elliptical-surface-crack-in-a-straight-pipe', component: SESCIASPComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'new/simple-iron-bar', component: SIBComponent},
    {path: 'materials', component: MaterialsComponent,canActivate:[AuthGuard]},
    {path: 'error/:code', component: ErrorComponent,canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
