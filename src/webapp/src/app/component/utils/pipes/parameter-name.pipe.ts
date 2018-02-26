import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'parameterName'})
export class ParameterNamePipe implements PipeTransform {


    parameterNames: Map<string, string> = new Map([
        ['CRACK_DEPTH', 'Carck depth'],
        ['CRACK_LENGTH', 'Crack lenght'],
        ['WALL_THICKNESS', 'Wall thickness'],
        ['FRACTURE_TOUGHNESS', 'Fracture toughness'],
        ['YIELD_STRESS', 'Yield stress'],
        ['PLASTIC_COLLAPSE', 'Plastic collapse'],
        ['FRACTURE_TOUGHNESS', 'Fracture toughness'],
        ['OPERATING_PRESSURE', 'Operating Pressure'],
        ['INNER_RADIUS', 'Inner radius'],

        ['BAR_LOAD', 'Load'],
        ['BAR_STRENGTH', 'Strength']

    ]);


    transform(value: any, ...args: any[]): any {
        if (this.parameterNames.has(value)) {
            return this.parameterNames.get(value);
        }
        return '';
    }

}
