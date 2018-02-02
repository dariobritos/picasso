import {NORMAL, VARIABLE} from "../component/utils/constant/constants";

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

    constructor(code: string, type: string, distType: string, value: number, unit: string, magnitude: string) {
        this.type = type;
        this.code = code;
        this.value = value;
        this.unit = unit;
        this.magnitude = magnitude;

        if (type === VARIABLE) {
            this.distribution = new Distribution(distType, '0.1');
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
