import {NgModule} from "@angular/core";
import {StaticVariableInputComponent} from "./inputs/static-variable.input.component";
import {CalculationTypePipe} from "./pipes/calculation-type.pipe";
import {ParameterNamePipe} from "./pipes/parameter-name.pipe";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./navbar/navbar.component";
import {AppRoutingModule} from "../../routing/app-routing.module";

@NgModule({
  imports:[CommonModule,FormsModule,AppRoutingModule],
  declarations:[StaticVariableInputComponent, CalculationTypePipe, ParameterNamePipe,NavbarComponent],
  exports:[StaticVariableInputComponent,CalculationTypePipe,ParameterNamePipe,NavbarComponent]
})
export class InputsModule{
}
