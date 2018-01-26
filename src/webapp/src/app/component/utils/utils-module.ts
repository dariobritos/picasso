import {NgModule} from "@angular/core";
import {StaticVariableInputComponent} from "./inputs/static-variable.input.component";
import {ScenarioTypePipe} from "./pipes/scenario-type.pipe";
import {ParameterNamePipe} from "./pipes/parameter-name.pipe";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from "./navbar/navbar.component";
import {AppRoutingModule} from "../../routing/app-routing.module";
import {ScenarioIdPipe} from "./pipes/scenario-id.pipe";
import {StaticVariableOutputComponent} from "./outputs/static-variable.output.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
    declarations: [StaticVariableInputComponent,StaticVariableOutputComponent, ScenarioTypePipe, ScenarioIdPipe, ParameterNamePipe, NavbarComponent],
    exports: [StaticVariableInputComponent,StaticVariableOutputComponent, ScenarioTypePipe, ParameterNamePipe, NavbarComponent]
})
export class InputsModule {
}
