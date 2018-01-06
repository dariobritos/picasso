import {NgModule} from "@angular/core";
import {StaticVariableInputComponent} from "./inputs/static-variable.input.component";
import {ScenarioTypePipe} from "./pipes/scenario-type.pipe";
import {ParameterNamePipe} from "./pipes/parameter-name.pipe";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./navbar/navbar.component";
import {AppRoutingModule} from "../../routing/app-routing.module";

@NgModule({
  imports:[CommonModule,FormsModule,AppRoutingModule],
  declarations:[StaticVariableInputComponent, ScenarioTypePipe, ParameterNamePipe,NavbarComponent],
  exports:[StaticVariableInputComponent,ScenarioTypePipe,ParameterNamePipe,NavbarComponent]
})
export class InputsModule{
}
