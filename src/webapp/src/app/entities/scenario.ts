export class Distribution {
  type: string;
  parameters: Map<string, number>;
}

export class Parameter {

  constructor(code: string, type: string) {
    this.type = type;
    this.code = code;
    this.value = 0.0;
    this.unit = "CENTIMETER";
  }

  code: string;
  type: string;
  value: number;
  unit: string;
  distribution: Distribution;


  isStatic(): boolean {
    return ("STATIC" == this.type);
  }
}

export class Configuration{
  seed : number = (new Date()).getTime();
  presicion : number = 1000000;
}

export class Output {
  values: Map<string, object>;
}


export class Scenario {
  id: string;
  type: string;
  parameters: Map<string, Parameter>;
  configuration : Configuration;
  output: Output;

}
