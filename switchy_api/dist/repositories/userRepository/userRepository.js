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
exports.UserRepository = void 0;
const user_1 = require("../../models/user");
const databaseConnection_1 = __importDefault(require("../../database/databaseConnection"));
const jwtTokenService_1 = __importDefault(require("../../services/token/jwtTokenService"));
class UserRepository extends databaseConnection_1.default {
    constructor() {
        super();
        this.jwt = new jwtTokenService_1.default();
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const aux = new user_1.User({
                email: user.email,
                name: user.name,
                password: user.password,
                userName: user.userName,
            });
            const newUser = yield aux.save();
            const token = this.jwt.create(newUser._id.toString(), "1d");
            const res = {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                token: token,
            };
            return res;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const user = yield user_1.User.findById(id);
            if (user == null)
                return null;
            const res = {
                id: user === null || user === void 0 ? void 0 : user._id,
                email: user === null || user === void 0 ? void 0 : user.email,
                userName: user.userName,
                description: user === null || user === void 0 ? void 0 : user.description,
                name: user === null || user === void 0 ? void 0 : user.name,
                followers: user === null || user === void 0 ? void 0 : user.followers,
                following: user === null || user === void 0 ? void 0 : user.following,
            };
            return res;
        });
    }
    getByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const user = yield user_1.User.findOne({
                email: email,
                password: password,
            });
            if (!user)
                return null;
            const res = {
                id: user._id,
                name: user.name,
                email: email,
            };
            return res;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const userFromDataBase = yield user_1.User.findOne({
                email: email,
            });
            if (!userFromDataBase) {
                return null;
            }
            const user = {
                id: userFromDataBase._id,
                name: userFromDataBase.name,
                email: email,
                password: userFromDataBase.password,
            };
            return user;
        });
    }
    searchUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const res = yield user_1.User.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { userName: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } },
                ],
            });
            const userList = res.map((e) => {
                return {
                    email: e.email,
                    name: e.name,
                    id: e._id,
                    userName: e.userName,
                };
            });
            return userList;
        });
    }
    update(userId, name, email, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateObj = {};
            if (name) {
                Object.defineProperty(updateObj, "name", {
                    value: name,
                    enumerable: true,
                    configurable: true,
                    writable: true,
                });
            }
            if (email) {
                Object.defineProperty(updateObj, "email", {
                    value: email,
                    enumerable: true,
                    configurable: true,
                    writable: true,
                });
            }
            if (description) {
                Object.defineProperty(updateObj, "description", {
                    value: description,
                    enumerable: true,
                    configurable: true,
                    writable: true,
                });
            }
            const res = yield user_1.User.findByIdAndUpdate(userId, updateObj, { returnDocument: "after" });
            if (res == null)
                return null;
            const user = {
                id: res === null || res === void 0 ? void 0 : res._id,
                email: res === null || res === void 0 ? void 0 : res.email,
                userName: res.userName,
                description: res.description,
                name: res === null || res === void 0 ? void 0 : res.name,
                followers: res === null || res === void 0 ? void 0 : res.followers,
                following: res === null || res === void 0 ? void 0 : res.following,
            };
            return user;
        });
    }
    getByIdWithPassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const user = yield user_1.User.findById(id);
            if (user == null)
                return null;
            const res = {
                id: user === null || user === void 0 ? void 0 : user._id,
                email: user === null || user === void 0 ? void 0 : user.email,
                password: user === null || user === void 0 ? void 0 : user.password,
                userName: user.userName,
                name: user === null || user === void 0 ? void 0 : user.name,
            };
            return res;
        });
    }
    changePasswordById(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield user_1.User.findByIdAndUpdate(userId, { password: newPassword });
        });
    }
    addFollow(userId, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield user_1.User.findByIdAndUpdate(userToFollow, {
                $push: { followers: { userId: userId } },
            });
        });
    }
    addFollowing(userId, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield user_1.User.findByIdAndUpdate(userId, {
                $push: { following: { userId: userToFollow } },
            });
        });
    }
    removeFollow(userId, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield user_1.User.findByIdAndUpdate(userToUnfollow, {
                $pull: { followers: { userId: userId } },
            });
        });
    }
    removeFollowing(userId, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield user_1.User.findByIdAndUpdate(userId, {
                $pull: { following: { userId: userToUnfollow } },
            });
        });
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const userFromDataBase = yield user_1.User.findOne({
                username: username,
            });
            if (!userFromDataBase) {
                return null;
            }
            const user = {
                id: userFromDataBase._id,
                name: userFromDataBase.name,
                email: userFromDataBase.email,
                password: userFromDataBase.password,
            };
            return user;
        });
    }
    updateUsername(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield user_1.User.findByIdAndUpdate(userId, { username: username });
        });
    }
}
exports.UserRepository = UserRepository;
