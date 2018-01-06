import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'calculationName'})
export class CalculationTypePipe implements PipeTransform {


  problemNames: Map<string, string> = new Map().set('SE_SURFACE_CRACK_STRAIGHT_PIPE', 'Semi-elliptical surface crack in a straight pipe.');


  transform(value: any, ...args: any[]): any {
    if (this.problemNames.has(value)) {
      return this.problemNames.get(value);
    }
    return '';
  }


}
