"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(message = "internal server error", code = 500) {
        super(message);
        this.code = code;
    }
}
exports.default = ServerError;
