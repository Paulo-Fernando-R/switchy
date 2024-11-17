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
const userErrors_1 = require("../errors/userErrors");
class GetUserByEmailCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (email == null || email == '') {
                throw new userErrors_1.UserInvalidEmailError();
            }
            const user = (_a = this.userRepository.getByEmail(email)) !== null && _a !== void 0 ? _a : null;
            return yield user;
        });
    }
}
exports.default = GetUserByEmailCase;
