import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScenariosComponent} from "../component/scenario/scenarios.component";
import {ScenarioDetailComponent} from "../component/scenario/detail/scenario-detail.component";
import {DashboardComponent} from "../component/dashboard/dashboard.component";
import {HomeComponent} from "../component/home/home.component";
import {NewScenarioComponent} from "../component/scenario/new/new-scenario.component";
import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import {MaterialsComponent} from "../component/materials/materials.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'scenario/:id', component: ScenarioDetailComponent},
  {path: 'scenarios', component: ScenariosComponent},
  {path: 'new', component: NewScenarioComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'materials', component: MaterialsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
