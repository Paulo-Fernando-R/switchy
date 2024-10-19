export abstract class SignUpError extends Error {
    code: number;
    constructor(message: string = "Error at signup", code: number = 500) {
        super(message);
        this.code = code;
    }
}

export class EmailAlreadyTaken extends SignUpError {}

