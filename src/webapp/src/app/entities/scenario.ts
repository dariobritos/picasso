import {
    DISTANCE, FRACTURE_TOUGHNESS,
    INCH, INTERNATIONAL, MEGAPASCAL, MILLIMETER, NEWTON_MILLIMETER_2, NORMAL, PREASURE,
    VARIABLE
} from "../component/utils/constant/constants";

export class CommonItem {
    constructor(code: string, value: string) {
        this.code = code;
        this.value = value;
    }

    code: string;
    value: string;
}

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
            case PREASURE:
                this.unit = (system === INTERNATIONAL) ? MEGAPASCAL : NEWTON_MILLIMETER_2;
                break;
            case FRACTURE_TOUGHNESS:
                this.unit = FRACTURE_TOUGHNESS;
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
        return ("STATIC" == this.type);
    }
}


class OutputItem {
    code: string;
    value: string;
}

export class Scenario {

    constructor() {
        this.parameters = [];
        this.configuration = [];
    }

    id: string;
    type: string;
    unitSystem: string;
    parameters: Array<Parameter>;
    configuration: Array<CommonItem>;
    comments: string;
    output: Array<OutputItem>;

}
