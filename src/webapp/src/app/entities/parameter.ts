import {CommonItem} from "./scenario";
import {
    DISTANCE, FORCE,
    FRACTURE_TOUGHNESS,
    INCH,
    INTERNATIONAL,
    KSI,
    KSI_INCH_0_5,
    MEGAPASCAL,
    MEGAPASCAL_METER_0_5,
    MILLIMETER, NEWTON,
    NORMAL,
    PLASTIC_COLLAPSE, POUND_FORCE,
    PRESSURE,
    VARIABLE
} from "../component/utils/constant/constants";

export class Distribution {


    constructor(type: string, value: string) {
        this.type = type;
        this.parameters = [];
        this.parameters.push(new CommonItem(type === NORMAL ? 'VARIANCE' : 'SCALE', value));
    }


    type: string;
    parameters: Array<CommonItem>;
}

export class Parameter {

    constructor(code: string, type: string, distType: string, value: number, system: string, magnitude: string) {
        this.type = type;
        this.code = code;
        this.value = value;
        this.magnitude = magnitude;

        if (type === VARIABLE) {
            this.distribution = new Distribution(distType, '0.1');
        }

        switch (magnitude) {
            case DISTANCE:
                this.unit = (system === INTERNATIONAL) ? MILLIMETER : INCH;
                break;
            case PRESSURE:
                this.unit = (system === INTERNATIONAL) ? MEGAPASCAL : KSI;
                break;
            case FORCE:
                this.unit = (system === INTERNATIONAL) ? NEWTON : POUND_FORCE;
                break;
            case FRACTURE_TOUGHNESS:
                this.unit = (system === INTERNATIONAL) ? MEGAPASCAL_METER_0_5 : KSI_INCH_0_5;
                break;
            case PLASTIC_COLLAPSE:
                this.unit = PLASTIC_COLLAPSE;
                break;
        }
    }

    code: string;
    type: string;
    value: number;
    magnitude: string;
    unit: string;
    distribution: Distribution;

    valid: boolean = false;

    isStatic(): boolean {
        return ("DETERMINISTIC" == this.type);
    }
}