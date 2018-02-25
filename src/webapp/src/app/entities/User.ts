export class UserConfiguration {

    constructor() {
        this.unitSystem = "INT";
        this.language = "EN"
    }

    unitSystem: string;
    language: string;
}

export class User {
    constructor() {

    }

    id:string;
    email: string;
    name: string;
    surname: string;
    organization:string;
    configuration: UserConfiguration;

    token:string;
}