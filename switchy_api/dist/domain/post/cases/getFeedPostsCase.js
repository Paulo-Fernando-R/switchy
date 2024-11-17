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
const mongoose_1 = require("mongoose");
const postErrors_1 = require("../errors/postErrors");
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
                    return yield this.postRepository.getFeedPosts(userId, page);
                }
                const ids = followings.map((e) => new mongoose_1.Types.ObjectId(e.userId));
                const response = yield this.postRepository.getFeedPosts(userId, page, ids);
                return response;
            }
            catch (error) {
                console.error(error);
                throw new postErrors_1.UnableGetPostError();
            }
        });
    }
}
exports.default = GetFeedPostsCase;
