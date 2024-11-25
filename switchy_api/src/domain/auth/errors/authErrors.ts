export abstract class AuthError extends Error {
    constructor() {
        super();

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class AuthEmptyFieldsError extends AuthError {}

export class AuthInvalidTokenError extends AuthError {}