"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtTokenService {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }
    isValid(token) {
        var result = jsonwebtoken_1.default.verify(token, this.secret);
        result = result;
        return result;
    }
    create(userId, expiration) {
        const token = jsonwebtoken_1.default.sign({
            userId: userId,
        }, this.secret, {
            expiresIn: expiration,
        });
        return token;
    }
}
exports.default = JwtTokenService;
