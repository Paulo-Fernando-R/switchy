export abstract class SignUpError extends Error {
    code: number;
    constructor(message: string = "Error at signup", code: number = 500) {
        super(message);
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class EmailAlreadyTaken extends SignUpError {}

