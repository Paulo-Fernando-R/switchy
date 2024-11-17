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
class SignUpCase {
    constructor(userRepository, encryptService) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
    }
    execute(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!newUserData.name || !newUserData.email || !newUserData.password) {
                throw new userErrors_1.UserEmptyFieldsError();
            }
            const emailAlreadyTaken = yield this.userRepository.getByEmail(newUserData.email);
            if (emailAlreadyTaken != null) {
                throw new userErrors_1.UserInvalidEmailError();
            }
            const usernameAlreadyTaken = yield this.userRepository.getByUsername(newUserData.userName);
            if (usernameAlreadyTaken != null) {
                throw new userErrors_1.UserInvalidUsernameError();
            }
            newUserData.password = yield this.encryptService.hashPassword(newUserData.password);
            const user = {
                email: newUserData.email,
                name: newUserData.name,
                password: newUserData.password,
                userName: newUserData.userName,
            };
            return yield this.userRepository.create(user);
        });
    }
}
exports.default = SignUpCase;
