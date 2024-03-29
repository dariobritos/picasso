import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'parameterName'})
export class ParameterNamePipe implements PipeTransform {


  parameterNames: Map<string, string> = new Map([
    ['CRACK_DEPTH', 'Carck depth'],
    ['CRACK_LENGTH', 'Crack lenght'],
    ['WALL_THICKNESS', 'Wall thickness'],
    ['FRACTURE_TOUGHNESS', 'Fracture toughness'],
    ['YIELD_STRESS', 'Yeld stress'],
    ['OPERATING_PRESSURE', 'Operating Pressure'],
    ['INNER_RADIUS', 'Inner radius']
  ]);


  transform(value: any, ...args: any[]): any {
    if (this.parameterNames.has(value)) {
      return this.parameterNames.get(value);
    }
    return '';
  }

}
