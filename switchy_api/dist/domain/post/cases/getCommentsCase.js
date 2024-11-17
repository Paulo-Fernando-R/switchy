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
class GetCommentsCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.getPostById(id);
            const comments = post.comments;
            if (!comments || comments.length == 0) {
                return [];
            }
            const ids = comments.map((e) => new mongoose_1.Types.ObjectId(e.postId));
            const posts = yield this.postRepository.getPostComments(ids);
            return posts;
        });
    }
}
exports.default = GetCommentsCase;
