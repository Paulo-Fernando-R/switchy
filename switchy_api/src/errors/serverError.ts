export default class ServerError extends Error {
    code: number;
    constructor(message: string = "internal server error", code: number = 500) {
        super(message);
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
