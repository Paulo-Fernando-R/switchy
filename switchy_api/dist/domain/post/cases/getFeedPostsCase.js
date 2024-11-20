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
const getFeedPostsResponse_1 = __importDefault(require("../response/getFeedPostsResponse"));
class GetFeedPostsCase {
    constructor(_postRepository, _userRepository) {
        this.postRepository = _postRepository;
        this.userRepository = _userRepository;
    }
    execute(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.getById(userId);
                const followings = user === null || user === void 0 ? void 0 : user.following;
                if (!followings || followings.length == 0) {
                    const posts = yield this.postRepository.getFeedPosts(userId, page);
                    const response = new getFeedPostsResponse_1.default(posts);
                    response.setPostsLikedByUser(userId);
                    return response.getResponse();
                }
                const ids = followings.map((e) => new mongoose_1.Types.ObjectId(e.userId));
                const posts = yield this.postRepository.getFeedPosts(userId, page, ids);
                const response = new getFeedPostsResponse_1.default(posts);
                response.setPostsLikedByUser(userId);
                return response.getResponse();
            }
            catch (error) {
                console.error(error);
                throw new postErrors_1.UnableGetPostError();
            }
        });
    }
}
exports.default = GetFeedPostsCase;
