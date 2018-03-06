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

export class LoginData {
    constructor() {

    }

    username: string;
    password: string;
}

export class NewUser {
    constructor() {

    }

    id:string;
    password:string;
    email: string;
    name: string;
    surname: string;
    organization:string;
    configuration: UserConfiguration;

    token:string;
}