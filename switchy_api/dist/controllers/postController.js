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
const postRepository_1 = require("../repositories/postRepository/postRepository");
const status_codes_1 = require("../utils/status_codes");
const createPostCase_1 = __importDefault(require("../domain/post/cases/createPostCase"));
const postErrors_1 = require("../domain/post/errors/postErrors");
const getFeedPostsCase_1 = __importDefault(require("../domain/post/cases/getFeedPostsCase"));
const getPostByIdCase_1 = __importDefault(require("../domain/post/cases/getPostByIdCase"));
const updateLikeOfPostCase_1 = __importDefault(require("../domain/post/cases/updateLikeOfPostCase"));
const getUserPostsCase_1 = __importDefault(require("../domain/post/cases/getUserPostsCase"));
const userRepository_1 = require("../repositories/userRepository/userRepository");
class PostController {
    constructor() {
        this.postRepository = new postRepository_1.PostRepository();
        this.getUserPostsCase = new getUserPostsCase_1.default(this.postRepository);
        this.userRepository = new userRepository_1.UserRepository();
        this.getFeedPostsCase = new getFeedPostsCase_1.default(this.postRepository, this.userRepository);
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, parentId } = req.body;
            const userId = req.userId;
            try {
                yield new createPostCase_1.default(this.postRepository).execute(parentId, content, userId);
                res.status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (error) {
                if (error instanceof postErrors_1.PostEmptyValueError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send("content is required");
                }
                if (error instanceof postErrors_1.UnableCreatePostError) {
                    res.status(status_codes_1.StatusCodes.InternalServerError).send();
                }
            }
        });
    }
    getFeedPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { page } = req.params;
            let pageInt = 1;
            if (page)
                pageInt = parseInt(page);
            const response = yield this.getFeedPostsCase.execute(userId, pageInt);
            res.status(status_codes_1.StatusCodes.Ok).send(response);
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.params;
            const userId = req.userId;
            try {
                const response = yield new getPostByIdCase_1.default(this.postRepository).execute(postId, userId);
                res.status(status_codes_1.StatusCodes.Ok).send(response);
            }
            catch (error) {
                res.status(status_codes_1.StatusCodes.InternalServerError).send(error);
            }
        });
    }
    putLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId, value } = req.body;
            const userId = req.userId;
            try {
                yield new updateLikeOfPostCase_1.default(this.postRepository).execute(postId, userId, value);
                res.status(status_codes_1.StatusCodes.Ok).send();
            }
            catch (error) {
                if (error instanceof postErrors_1.PostEmptyValueError) {
                    res.status(status_codes_1.StatusCodes.BadRequest).send("postId is required");
                }
            }
        });
    }
    getUserPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, page } = req.params;
            let pageInt = 1;
            if (page)
                pageInt = parseInt(page);
            const list = yield this.getUserPostsCase.execute(userId, pageInt);
            res.status(status_codes_1.StatusCodes.Ok).send(list);
        });
    }
}
exports.default = PostController;
