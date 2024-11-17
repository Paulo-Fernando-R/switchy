"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInvalidTokenError = exports.AuthEmptyFieldsError = exports.AuthError = void 0;
class AuthError extends Error {
}
exports.AuthError = AuthError;
class AuthEmptyFieldsError extends AuthError {
}
exports.AuthEmptyFieldsError = AuthEmptyFieldsError;
class AuthInvalidTokenError extends AuthError {
}
exports.AuthInvalidTokenError = AuthInvalidTokenError;
