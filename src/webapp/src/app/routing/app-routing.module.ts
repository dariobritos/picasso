import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScenariosComponent} from "../component/scenario/scenarios.component";
import {ScenarioDetailComponent} from "../component/scenario/detail/scenario-detail.component";
import {DashboardComponent} from "../component/dashboard/dashboard.component";
import {HomeComponent} from "../component/home/home.component";
import {SESCIASPComponent} from "../component/scenario/new/SESCIASP/SESCIASP.component";
import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import {MaterialsComponent} from "../component/materials/materials.component";


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'scenario/:id', component: ScenarioDetailComponent},
    {path: 'scenarios', component: ScenariosComponent},
    {path: 'new', component: SESCIASPComponent},
    {path: 'new/:type', component: SESCIASPComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: 'materials', component: MaterialsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
