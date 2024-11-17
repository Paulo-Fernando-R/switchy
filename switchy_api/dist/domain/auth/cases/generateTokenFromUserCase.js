"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
class GenerateTokenFromUserCase {
    constructor(tokenService) {
        this.tokenExpires = process.env.TOKEN_EXPIRES;
        this.refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES;
        this.tokenService = tokenService;
    }
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const expireTime = new Date(new Date().toUTCString());
            const expiresInHours = parseInt(this.tokenExpires);
            expireTime.setHours(expireTime.getHours() + expiresInHours);
            const id = user.id.toString();
            const accessToken = this.tokenService.create(id, this.tokenExpires);
            const refreshToken = this.tokenService.create(id, this.refreshTokenExpires);
            const response = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessTokenExpiresAtUtc: expireTime,
            };
            return response;
        });
    }
}
exports.default = GenerateTokenFromUserCase;
