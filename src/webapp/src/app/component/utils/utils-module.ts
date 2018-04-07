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
import {AbbreviationPipe} from "./pipes/abbreviation.pipe";
import {StaticInputComponent} from "./inputs/static.input.component";
import {TranslateModule} from "ng2-translate";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule,TranslateModule.forRoot()],
    declarations: [StaticInputComponent,StaticVariableInputComponent,StaticVariableOutputComponent, ScenarioTypePipe, ScenarioIdPipe, ParameterNamePipe,AbbreviationPipe, NavbarComponent],
    exports: [TranslateModule,StaticInputComponent,StaticVariableInputComponent,StaticVariableOutputComponent, ScenarioTypePipe, ParameterNamePipe,AbbreviationPipe, NavbarComponent]
})
export class InputsModule {
}
