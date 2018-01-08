

export class UserConfiguration{

    constructor(){
        this.unitSystem = "INT";
        this.language = "EN"
    }

    unitSystem : string;
    language : string;
}

export class User {
    constructor() {
        this.email = 'dario.britos@gmail.com';
        this.name = 'Dario';
        this.surname = 'Britos';
        this.configuration = new UserConfiguration();
    }

    email: string;
    name: string;
    surname: string;
    configuration : UserConfiguration;


}