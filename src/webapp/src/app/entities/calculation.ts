
export class Distribution{
  type : string;
  parameters: Map<string,number>;
}

export class Input{
  type : string;
  value : number;
  unit : string;
  distribution : Distribution;
}

export class Output{
  values : Map<string,object>;
}


export class Calculation {
  id: string;
  type: string;
  inputs : Input[];
  output : Output;

}
