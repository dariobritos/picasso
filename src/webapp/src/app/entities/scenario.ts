import {Parameter} from "./parameter";

export class CommonItem {
    constructor(code: string, value: string) {
        this.code = code;
        this.value = value;
    }

    code: string;
    value: string;
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
