import {Pipe, PipeTransform} from "@angular/core";
import {
    CENTIMETER, FOOT, INCH, KILOPASCAL, MEGAPASCAL, MEGAPASCAL_METER_0_5, MILLIMETER, NEWTON_CENTIMETER_2,
    NEWTON_MILLIMETER_2,
    THOU
} from "../constant/constants";

@Pipe({name: 'abbreviations'})
export class AbbreviationPipe implements PipeTransform {


    parameterNames: Map<string, string> = new Map([
        [MILLIMETER, 'mm'],
        [CENTIMETER, 'cm'],
        [KILOPASCAL, 'kpa'],
        [MEGAPASCAL, 'mpa'],
        [INCH, 'inch'],
        [FOOT, 'foot'],
        [THOU, 'thou'],
        [NEWTON_MILLIMETER_2, 'nw/mm2'],
        [NEWTON_CENTIMETER_2, 'nw/cm2'],
        [MEGAPASCAL_METER_0_5, 'mpa.m0.5']


    ]);


    transform(value: any, ...args: any[]): any {
        if (this.parameterNames.has(value)) {
            return this.parameterNames.get(value);
        }
        return '';
    }

}
