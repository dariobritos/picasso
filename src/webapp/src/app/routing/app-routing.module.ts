import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScenariosComponent} from "../component/scenario/scenarios.component";
import {ScenarioDetailComponent} from "../component/scenario/detail/scenario-detail.component";
import {DashboardComponent} from "../component/dashboard/dashboard.component";
import {HomeComponent} from "../component/home/home.component";
import {SESCIASPComponent} from "../component/scenario/SESCIASP/SESCIASP.component";
import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import {MaterialsComponent} from "../component/materials/materials.component";
import {ErrorComponent} from "../component/error/error.component";
import {AuthGuard} from "../service/auth_guard.service";
import {SignupComponent} from "../component/register/signup.component";


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
    {path: 'scenario/:id', component: ScenarioDetailComponent,canActivate:[AuthGuard]},
    {path: 'scenarios', component: ScenariosComponent,canActivate:[AuthGuard]},
    {path: 'new/semi-elliptical-surface-crack-in-a-straight-pipe', component: SESCIASPComponent,canActivate:[AuthGuard]},
    {path: 'profile', component: UserProfileComponent,canActivate:[AuthGuard]},
    {path: 'signup', component: SignupComponent},
    {path: 'materials', component: MaterialsComponent,canActivate:[AuthGuard]},
    {path: 'error/:code', component: ErrorComponent,canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
