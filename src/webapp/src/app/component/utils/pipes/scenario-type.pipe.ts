import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'scenarioName'})
export class ScenarioTypePipe implements PipeTransform {

    problemNames: Map<string, string> = new Map([['SE_SURFACE_CRACK_STRAIGHT_PIPE', 'Structural reliability of fissured pipes based on the fault evaluation diagram'],['CIRCULAR_SECTION_BAR_SUBJECTED_TO_TRACTION','Structural reliability of circular section bar subjected to traction']]);
        //new Map().set('SE_SURFACE_CRACK_STRAIGHT_PIPE', 'Structural reliability of fissured pipes based on the fault evaluation diagram');


    transform(value: any, ...args: any[]): any {
        if (this.problemNames.has(value)) {
            return this.problemNames.get(value);
        }
        return '';
    }

}


