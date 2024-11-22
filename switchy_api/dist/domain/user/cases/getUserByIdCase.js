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
class GetUserByIdCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const user = yield this.userRepository.getById(userId);
            if (user == null) {
                throw new userErrors_1.UserNotFoundError();
            }
            const response = {
                id: user.id.toString(),
                email: user.email,
                userName: user.userName,
                description: (_a = user.description) !== null && _a !== void 0 ? _a : null,
                name: user.name,
                createdAt: user.createdAt,
                followers: (_b = user.followers) !== null && _b !== void 0 ? _b : [],
                following: (_c = user.following) !== null && _c !== void 0 ? _c : [],
            };
            return response;
        });
    }
}
exports.default = GetUserByIdCase;
