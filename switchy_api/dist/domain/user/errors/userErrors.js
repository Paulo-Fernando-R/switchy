"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamePasswordError = exports.UserInvalidPasswordError = exports.UserInvalidUsernameError = exports.UserInvalidEmailError = exports.UserNotFoundError = exports.UserEmptyFieldsError = exports.UserError = void 0;
class UserError extends Error {
    constructor(message = "Default user error", statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.UserError = UserError;
class UserEmptyFieldsError extends UserError {
}
exports.UserEmptyFieldsError = UserEmptyFieldsError;
class UserNotFoundError extends UserError {
}
exports.UserNotFoundError = UserNotFoundError;
class UserInvalidEmailError extends UserError {
}
exports.UserInvalidEmailError = UserInvalidEmailError;
class UserInvalidUsernameError extends UserError {
}
exports.UserInvalidUsernameError = UserInvalidUsernameError;
class UserInvalidPasswordError extends UserError {
}
exports.UserInvalidPasswordError = UserInvalidPasswordError;
class SamePasswordError extends UserError {
}
exports.SamePasswordError = SamePasswordError;
