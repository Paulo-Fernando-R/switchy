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
class UpdateUsernameCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId, newUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            var userWithUsername = yield this.userRepository.getByUsername(newUsername);
            if (userWithUsername) {
                throw new userErrors_1.UserInvalidUsernameError('Invalid Username');
            }
            yield this.userRepository.updateUsername(userId, newUsername);
        });
    }
}
exports.default = UpdateUsernameCase;
