export class Distribution {
    type: string;
    parameters: Map<string, number>;
}

export class Parameter {

    constructor(code: string, type: string, value: number, unit: string, magnitude: string) {
        this.type = type;
        this.code = code;
        this.value = 0.1;
        this.unit = unit;
        this.magnitude = magnitude;
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

export class Configuration {
    seed: number = (new Date()).getTime();
    presicion: number = 1000000;
}

export class Output {
    values: Map<string, object>;
}


export class Scenario {
    id: string;
    type: string;
    unitSystem: string;
    parameters: Array<Parameter>;
    configuration: Configuration;
    output: Output;


    toObject() {
        let obj = {};

        obj['id'] = this.id;
        obj['type'] = this.type;
        obj['unitSystem'] = this.unitSystem;

        let params = {};
        this.parameters.forEach((value: Parameter) => {
            params[value.code] = value;
        });
        obj['parameters'] = params;
        obj['configuration'] = this.configuration;
        obj['output'] = this.output;



        return obj;

    }

}
