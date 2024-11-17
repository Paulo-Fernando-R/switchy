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
const jsonwebtoken_1 = require("jsonwebtoken");
const userErrors_1 = require("../../user/errors/userErrors");
const authErrors_1 = require("../errors/authErrors");
class GetUserFromTokenCase {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new authErrors_1.AuthEmptyFieldsError();
            }
            let result;
            try {
                result = this.tokenService.isValid(token);
            }
            catch (ex) {
                if (ex instanceof jsonwebtoken_1.JsonWebTokenError) {
                    throw new authErrors_1.AuthInvalidTokenError();
                }
                throw ex;
            }
            const id = result.userId;
            const user = yield this.userRepository.getById(id);
            if (user == null) {
                throw new userErrors_1.UserNotFoundError();
            }
            return user;
        });
    }
}
exports.default = GetUserFromTokenCase;
