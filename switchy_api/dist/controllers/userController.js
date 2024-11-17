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
const userRepository_1 = require("../repositories/userRepository/userRepository");
const status_codes_1 = require("../utils/status_codes");
const signUpCase_1 = __importDefault(require("../domain/user/cases/signUpCase"));
const encryptService_1 = __importDefault(require("../services/encrypt/encryptService"));
const userErrors_1 = require("../domain/user/errors/userErrors");
const getUserByIdCase_1 = __importDefault(require("../domain/user/cases/getUserByIdCase"));
const searchUserCase_1 = __importDefault(require("../domain/user/cases/searchUserCase"));
const updateUserCase_1 = __importDefault(require("../domain/user/cases/updateUserCase"));
const changePasswordCase_1 = __importDefault(require("../domain/user/cases/changePasswordCase"));
const followUserCase_1 = __importDefault(require("../domain/user/cases/followUserCase"));
const unfollowUserCase_1 = __importDefault(require("../domain/user/cases/unfollowUserCase"));
const updateUsernameCase_1 = __importDefault(require("../domain/user/cases/updateUsernameCase"));
const generateTokenFromUserCase_1 = __importDefault(require("../domain/auth/cases/generateTokenFromUserCase"));
const jwtTokenService_1 = __importDefault(require("../services/token/jwtTokenService"));
const getUserByEmailCase_1 = __importDefault(require("../domain/user/cases/getUserByEmailCase"));
const generatePasswordService_1 = __importDefault(require("../services/crypto/generatePasswordService"));
const sendRecoveryPasswordEmailCase_1 = __importDefault(require("../domain/user/cases/sendRecoveryPasswordEmailCase"));
const recoveryEmail_1 = require("../services/smtp/recoveryEmail");
class UserController {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
        this.encryptService = new encryptService_1.default();
        this.tokenService = new jwtTokenService_1.default();
        this.signUpCase = new signUpCase_1.default(this.userRepository, this.encryptService);
        this.searchUserCase = new searchUserCase_1.default(this.userRepository, this.encryptService);
        this.getUserByIdCase = new getUserByIdCase_1.default(this.userRepository);
        this.updateUserCase = new updateUserCase_1.default(this.userRepository);
        this.changeUserPasswordCase = new changePasswordCase_1.default(this.userRepository, this.encryptService);
        this.followUserCase = new followUserCase_1.default(this.userRepository);
        this.unfollowUserCase = new unfollowUserCase_1.default(this.userRepository);
        this.updateUsernameCase = new updateUsernameCase_1.default(this.userRepository);
        this.generateTokenFromUserCase = new generateTokenFromUserCase_1.default(this.tokenService);
        this.getUserByEmailCase = new getUserByEmailCase_1.default(this.userRepository);
        this.generatePaswordService = new generatePasswordService_1.default();
        this.recoveryEmail = new recoveryEmail_1.RecoveryEmail();
        this.sendRecoveryPasswordEmailCase = new sendRecoveryPasswordEmailCase_1.default(this.recoveryEmail);
    }
    signUp(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, userName } = request.body;
                const signUpRequest = { name, email, password, userName };
                const newUser = yield this.signUpCase.execute(signUpRequest);
                const res = yield this.generateTokenFromUserCase.execute(newUser);
                response.type("application/json").status(status_codes_1.StatusCodes.Created).send(res);
            }
            catch (error) {
                if (error instanceof userErrors_1.UserEmptyFieldsError) {
                    response.status(status_codes_1.StatusCodes.BadRequest).send();
                }
                else if (error instanceof userErrors_1.UserInvalidEmailError) {
                    response.status(status_codes_1.StatusCodes.InvalidEmail).send();
                }
                else if (error instanceof userErrors_1.UserInvalidUsernameError) {
                    response.status(status_codes_1.StatusCodes.InvalidUsername).send();
                }
                else
                    throw error;
            }
        });
    }
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = yield new getUserByIdCase_1.default(this.userRepository).execute(req.userId);
                res.type("application/json").status(status_codes_1.StatusCodes.Ok).send(userInfo);
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserNotFoundError) {
                    res.status(status_codes_1.StatusCodes.NotFound).send();
                    return;
                }
                throw ex;
            }
        });
    }
    getInfoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const userInfo = yield new getUserByIdCase_1.default(this.userRepository).execute(userId);
                res.type("application/json").status(status_codes_1.StatusCodes.Ok).send(userInfo);
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserNotFoundError) {
                    res.status(status_codes_1.StatusCodes.NotFound).send();
                    return;
                }
                throw ex;
            }
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query } = req.params;
            try {
                const userInfo = yield this.searchUserCase.execute(query);
                res.type("application/json").status(status_codes_1.StatusCodes.Ok).send(userInfo);
            }
            catch (ex) {
                res.status(status_codes_1.StatusCodes.InternalServerError).send();
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            const userId = req.userId;
            try {
                const user = yield this.updateUserCase.execute(userId, name, email);
                return res.type("application/json").status(status_codes_1.StatusCodes.Ok).send(user);
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserNotFoundError) {
                    return res.status(status_codes_1.StatusCodes.NotFound).send();
                }
                else if (ex instanceof userErrors_1.UserInvalidEmailError) {
                    return res.status(status_codes_1.StatusCodes.BadRequest).send(ex.message);
                }
            }
        });
    }
    updateUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            const userId = req.userId;
            try {
                yield this.updateUsernameCase.execute(userId, username);
                return res.type("application/json").status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserInvalidUsernameError) {
                    return res.status(status_codes_1.StatusCodes.BadRequest).send(ex.message);
                }
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { oldPassword, newPassword } = req.body;
            try {
                yield this.changeUserPasswordCase.execute(req.userId, oldPassword, newPassword);
                return res.type("application/json").status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserEmptyFieldsError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send("Missing required fields.");
                    return;
                }
                if (ex instanceof userErrors_1.SamePasswordError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send("New password cannot be the same as previous.");
                    return;
                }
                if (ex instanceof userErrors_1.UserError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send(ex.message);
                    return;
                }
                throw ex;
            }
        });
    }
    follow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const id = req.userId;
            try {
                yield this.getUserByIdCase.execute(userId);
                yield this.getUserByIdCase.execute(id);
                this.followUserCase.execute(id, userId);
                return res.type("application/json").status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserNotFoundError) {
                    return res.status(status_codes_1.StatusCodes.NotFound).send();
                }
                throw ex;
            }
        });
    }
    unfollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const id = req.userId;
            try {
                yield this.getUserByIdCase.execute(userId);
                yield this.getUserByIdCase.execute(id);
                yield this.unfollowUserCase.execute(id, userId);
                return res.type("application/json").status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserNotFoundError) {
                    return res.status(status_codes_1.StatusCodes.NotFound).send();
                }
                throw ex;
            }
        });
    }
    recoveryPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield this.getUserByEmailCase.execute(email);
                if (user) {
                    const newPassword = this.generatePaswordService.generateHex(13);
                    console.log(newPassword);
                    yield this.changeUserPasswordCase.execute(user.id, user.password, newPassword);
                    yield this.sendRecoveryPasswordEmailCase.execute(user.email, newPassword);
                    return res.type("application/json").status(status_codes_1.StatusCodes.Ok).send();
                }
                else {
                    return res.status(status_codes_1.StatusCodes.NotFound).send("User not found with this email.");
                }
            }
            catch (ex) {
                console.log(ex);
                if (ex instanceof userErrors_1.UserInvalidEmailError) {
                    return res.status(status_codes_1.StatusCodes.BadRequest).send("Invalid email.");
                }
                if (ex instanceof userErrors_1.UserEmptyFieldsError) {
                    return res.status(status_codes_1.StatusCodes.BadRequest).send("Missing required fields.");
                }
                return res.status(status_codes_1.StatusCodes.InternalServerError).send();
                //throw ex;
            }
        });
    }
}
exports.default = UserController;
