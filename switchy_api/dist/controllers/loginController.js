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
const status_codes_1 = require("../utils/status_codes");
const getUserByEmailPasswordCase_1 = __importDefault(require("../domain/user/cases/getUserByEmailPasswordCase"));
const userErrors_1 = require("../domain/user/errors/userErrors");
const generateTokenFromUserCase_1 = __importDefault(require("../domain/auth/cases/generateTokenFromUserCase"));
const getUserFromTokenCase_1 = __importDefault(require("../domain/auth/cases/getUserFromTokenCase"));
const authErrors_1 = require("../domain/auth/errors/authErrors");
const jwtTokenService_1 = __importDefault(require("../services/token/jwtTokenService"));
const userRepository_1 = require("../repositories/userRepository/userRepository");
const encryptService_1 = __importDefault(require("../services/encrypt/encryptService"));
class LoginController {
    constructor() {
        this.tokenService = new jwtTokenService_1.default();
        this.userRepository = new userRepository_1.UserRepository();
        this.encryptService = new encryptService_1.default();
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield new getUserByEmailPasswordCase_1.default(this.userRepository, this.encryptService).execute(email, password);
                const response = yield new generateTokenFromUserCase_1.default(this.tokenService).execute(user);
                res.type("application/json").status(status_codes_1.StatusCodes.Ok).send(response);
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserNotFoundError) {
                    res.status(status_codes_1.StatusCodes.NotFound).send();
                    return;
                }
                else if (ex instanceof userErrors_1.UserError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send();
                    return;
                }
                throw ex;
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            try {
                const user = yield new getUserFromTokenCase_1.default(this.userRepository, this.tokenService).execute(token);
                const response = yield new generateTokenFromUserCase_1.default(this.tokenService).execute(user);
                res.type("application/json").status(status_codes_1.StatusCodes.Ok).send(response);
            }
            catch (ex) {
                if (ex instanceof authErrors_1.AuthInvalidTokenError) {
                    res.status(status_codes_1.StatusCodes.Forbidden).send();
                    return;
                }
                else if (ex instanceof userErrors_1.UserNotFoundError) {
                    res.status(status_codes_1.StatusCodes.NotFound).send();
                    return;
                }
                else if (ex instanceof authErrors_1.AuthEmptyFieldsError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send();
                    return;
                }
                throw ex;
            }
        });
    }
}
exports.default = LoginController;
