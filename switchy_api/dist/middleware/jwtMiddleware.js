"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = jwtMiddleware;
require("dotenv/config");
const status_codes_1 = require("../utils/status_codes");
const jwtTokenService_1 = __importDefault(require("../services/token/jwtTokenService"));
function jwtMiddleware(request, response, next) {
    let token = request.headers["authorization"];
    if (!token) {
        response.status(status_codes_1.StatusCodes.Unauthorized).end();
        return;
    }
    const tokenService = new jwtTokenService_1.default();
    const reg = new RegExp(/Bearer/i);
    if (reg.test(token)) {
        token = token.split(" ")[1];
    }
    try {
        const decoded = tokenService.isValid(token);
        request.userId = decoded.userId;
        next();
    }
    catch (ex) {
        console.log(ex);
        response.status(status_codes_1.StatusCodes.Unauthorized).end();
        return;
    }
}
