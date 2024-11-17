"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyTaken = exports.SignUpError = void 0;
class SignUpError extends Error {
    constructor(message = "Error at signup", code = 500) {
        super(message);
        this.code = code;
    }
}
exports.SignUpError = SignUpError;
class EmailAlreadyTaken extends SignUpError {
}
exports.EmailAlreadyTaken = EmailAlreadyTaken;
