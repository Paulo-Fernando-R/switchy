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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userErrors_1 = require("../errors/userErrors");
const status_codes_1 = require("../../../utils/status_codes");
const serverError_1 = __importDefault(require("../../../errors/serverError"));
class SearchUserCase {
    constructor(userRepository, encryptService) {
        this.userRepository = userRepository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                throw new userErrors_1.UserEmptyFieldsError("Missing required fields", status_codes_1.StatusCodes.BadRequest);
            }
            try {
                const response = yield this.userRepository.searchUser(query);
                return response;
            }
            catch (error) {
                console.error(error);
                throw new serverError_1.default();
            }
        });
    }
}
exports.default = SearchUserCase;
