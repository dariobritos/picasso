import {SE_SURFACE_CRACK_STRAIGHT_PIPE} from "../component/utils/constant/constants";

export class UserPreferences {

    constructor() {
        this.unitSystem = "INT";
        this.language = "EN";
        this.fastScenario = SE_SURFACE_CRACK_STRAIGHT_PIPE;
    }

    unitSystem: string;
    language: string;
    fastScenario: string;
}

export class User {
    constructor() {

    }

    id: string;
    email: string;
    name: string;
    surname: string;
    organization: string;
    preferences: UserPreferences;

    token: string;
}

export class LoginData {
    constructor() {

    }

    username: string;
    password: string;
}

export class NewUser {
    constructor() {
        this.preferences = new UserPreferences();
    }

    id: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    organization: string;
    preferences: UserPreferences;

    token: string;
}