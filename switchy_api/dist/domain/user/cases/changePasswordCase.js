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
class ChangeUserPasswordCase {
    constructor(userRepository, encryptService) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
    }
    execute(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !oldPassword || !newPassword) {
                throw new userErrors_1.UserEmptyFieldsError();
            }
            if (oldPassword == newPassword) {
                throw new userErrors_1.SamePasswordError();
            }
            const user = yield this.userRepository.getByIdWithPassword(userId);
            let isOldPasswordCorrect = true;
            if (oldPassword != user.password) {
                isOldPasswordCorrect = yield this.encryptService.comparePassword(oldPassword, user.password);
            }
            if (!isOldPasswordCorrect) {
                throw new userErrors_1.UserInvalidPasswordError('Incorrect user password.');
            }
            newPassword = yield this.encryptService.hashPassword(newPassword);
            yield this.userRepository.changePasswordById(userId, newPassword);
        });
    }
}
exports.default = ChangeUserPasswordCase;
