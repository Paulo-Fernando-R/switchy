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
class GetUserByEmailPasswordCase {
    constructor(userRepository, encryptService) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new userErrors_1.UserEmptyFieldsError();
            }
            // const isValidEmail = emailValidator.validate(email);
            // if (!isValidEmail) {
            //     throw new UserInvalidEmailError();
            // }
            // if (password.length < 8 || password.length > 16) {
            //     throw new UserInvalidPasswordError();
            // }
            const user = yield this.userRepository.getByEmail(email);
            if (user == null) {
                throw new userErrors_1.UserNotFoundError();
            }
            const isValidPassword = yield this.encryptService.comparePassword(password, user.password);
            if (!isValidPassword) {
                throw new userErrors_1.UserInvalidPasswordError();
            }
            return user;
        });
    }
}
exports.default = GetUserByEmailPasswordCase;
