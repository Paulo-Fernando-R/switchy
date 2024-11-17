"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignInResponse {
    constructor() {
        this.accessToken = '';
        this.refreshToken = '';
        this.accessTokenExpiresAtUtc = new Date();
    }
}
exports.default = SignInResponse;
