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
const postErrors_1 = require("../errors/postErrors");
class UpdateLikeOfPostCase {
    constructor(_postRepository) {
        this.postRepository = _postRepository;
    }
    execute(postId, userId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId) {
                throw new postErrors_1.PostEmptyValueError();
            }
            if (value) {
                yield this.postRepository.addLike(postId, userId);
            }
            else {
                yield this.postRepository.removeLike(postId, userId);
            }
        });
    }
}
exports.default = UpdateLikeOfPostCase;
