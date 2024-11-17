"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class GeneratePasswordService {
    generateHex(length) {
        return (0, crypto_1.randomBytes)(length / 2).toString('hex');
    }
}
exports.default = GeneratePasswordService;
