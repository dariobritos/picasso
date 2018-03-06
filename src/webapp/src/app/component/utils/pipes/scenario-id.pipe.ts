import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'scenarioId'})
export class ScenarioIdPipe implements PipeTransform {


    scenarioIds: Map<string, string> = new Map([['SE_SURFACE_CRACK_STRAIGHT_PIPE', 'semi-elliptical-surface-crack-in-a-straight-pipe'],['SIMPLE_IRON_BAR','simple-iron-bar']]);
        // new Map().set('SE_SURFACE_CRACK_STRAIGHT_PIPE', 'semi-elliptical-surface-crack-in-a-straight-pipe');



    transform(value: any, ...args: any[]): any {
        if (this.scenarioIds.has(value)) {
            return this.scenarioIds.get(value);
        }
        return '';
    }


}
