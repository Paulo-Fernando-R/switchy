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
const postRepository_1 = require("../repositories/postRepository/postRepository");
const getUserByIdCase_1 = __importDefault(require("../domain/user/cases/getUserByIdCase"));
const userErrors_1 = require("../domain/user/errors/userErrors");
const userRepository_1 = require("../repositories/userRepository/userRepository");
const saveCommentCase_1 = __importDefault(require("../domain/post/cases/saveCommentCase"));
const postErrors_1 = require("../domain/post/errors/postErrors");
const getCommentsCase_1 = __importDefault(require("../domain/post/cases/getCommentsCase"));
const mongoose_1 = require("mongoose");
class CommentsController {
    constructor() {
        this.postRepository = new postRepository_1.PostRepository();
        this.userRepository = new userRepository_1.UserRepository();
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, parentId } = req.body;
            const userId = req.userId;
            try {
                const user = yield new getUserByIdCase_1.default(this.userRepository).execute(userId);
                const aux = {
                    email: user.email,
                    name: user.name,
                    userName: user.userName,
                    id: new mongoose_1.Types.ObjectId(user.id),
                };
                yield new saveCommentCase_1.default(this.postRepository).execute(content, parentId, aux);
                res.status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (ex) {
                if (ex instanceof userErrors_1.UserError) {
                    res.status(status_codes_1.StatusCodes.NotFound).send();
                    return;
                }
                else if (ex instanceof postErrors_1.PostError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send();
                    return;
                }
                throw ex;
            }
        });
    }
    getByPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.params;
            const userId = req.userId;
            const response = yield new getCommentsCase_1.default(this.postRepository).execute(postId, userId);
            res.status(status_codes_1.StatusCodes.Ok).send(response);
        });
    }
}
exports.default = CommentsController;
