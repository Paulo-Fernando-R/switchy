export abstract class UserError extends Error {
    public statusCode: number;
    constructor(message: string = "Default user error", statusCode: number = 400){
        super(message);
        this.statusCode = statusCode;
    }
}

export class UserEmptyFieldsError extends UserError {}

export class UserNotFoundError extends UserError {}

export class UserInvalidEmailError extends UserError {}

export class UserInvalidPasswordError extends UserError {}