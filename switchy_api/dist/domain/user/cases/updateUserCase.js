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
const status_codes_1 = require("../../../utils/status_codes");
const userErrors_1 = require("../errors/userErrors");
class UpdateUserCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailAlreadyTaken = yield this.userRepository.getByEmail(email);
            if (emailAlreadyTaken != null) {
                throw new userErrors_1.UserInvalidEmailError("Email already taken.", status_codes_1.StatusCodes.BadRequest);
            }
            const res = yield this.userRepository.update(userId, name, email);
            return res;
        });
    }
}
exports.default = UpdateUserCase;
