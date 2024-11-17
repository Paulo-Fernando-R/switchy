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
const mongoose_1 = require("mongoose");
const postErrors_1 = require("../errors/postErrors");
const getUserByIdCase_1 = __importDefault(require("../../user/cases/getUserByIdCase"));
const userRepository_1 = require("../../../repositories/userRepository/userRepository");
class CreatePostCase {
    constructor(_postRepository) {
        this.postRepository = _postRepository;
    }
    execute(parentId, content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content) {
                throw new postErrors_1.PostEmptyValueError();
            }
            const user = yield new getUserByIdCase_1.default(new userRepository_1.UserRepository()).execute(userId);
            if (!user) {
                throw new postErrors_1.UnableCreatePostError();
            }
            const post = {
                user: {
                    email: user.email,
                    name: user.name,
                    userName: user.userName,
                    id: new mongoose_1.Types.ObjectId(userId),
                },
                comments: [],
                likes: [],
                content: content,
                publishDate: new Date(Date.now()),
                //@ts-ignore
                parentId: parentId ? parentId : null,
            };
            try {
                yield this.postRepository.createPost(post);
            }
            catch (error) {
                console.error(error);
                throw new postErrors_1.UnableCreatePostError();
            }
        });
    }
}
exports.default = CreatePostCase;
