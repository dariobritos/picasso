import {Pipe, PipeTransform} from "@angular/core";
import {
    CENTIMETER,
    FOOT,
    INCH,
    KILOPASCAL,
    KSI,
    KSI_INCH_0_5,
    MEGAPASCAL,
    MEGAPASCAL_METER_0_5,
    MILLIMETER, NEWTON, POUND_FORCE,
    PSI,
    THOU
} from "../constant/constants";

@Pipe({name: 'abbreviations'})
export class AbbreviationPipe implements PipeTransform {


    parameterNames: Map<string, string> = new Map([
        [MILLIMETER, 'mm'],
        [CENTIMETER, 'cm'],
        [KILOPASCAL, 'KPa'],
        [MEGAPASCAL, 'MPa'],
        [NEWTON, 'N'],
        [INCH, 'inch'],
        [FOOT, 'foot'],
        [THOU, 'thou'],
        [KSI, 'psi'],
        [PSI, 'ksi'],
        [POUND_FORCE, 'lbf'],
        [MEGAPASCAL_METER_0_5, 'mpa*m^0.5'],
        [KSI_INCH_0_5, 'ksi*inch^0.5']


    ]);


    transform(value: any, ...args: any[]): any {
        if (this.parameterNames.has(value)) {
            return this.parameterNames.get(value);
        }
        return '';
    }

}
