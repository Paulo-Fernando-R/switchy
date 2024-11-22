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
class GetFeedPostsCase {
    constructor(_postRepository, _userRepository) {
        this.postRepository = _postRepository;
        this.userRepository = _userRepository;
    }
    execute(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = yield this.userRepository.getById(userId);
            const followings = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.following;
            if (!followings || followings.length == 0) {
                const posts = yield this.postRepository.getFeedPosts(userId, page);
                const response = this.parsePostsToResponse(posts, userId);
                return response;
            }
            const ids = followings.map((e) => new mongoose_1.Types.ObjectId(e.userId));
            const posts = yield this.postRepository.getFeedPosts(userId, page, ids);
            var ls = this.parsePostsToResponse(posts, userId);
            return ls;
        });
    }
    parsePostsToResponse(posts, loggedUserId) {
        var ls = [];
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var comments = this.getTotalComments(post);
            var likes = this.getTotalLikes(post);
            var likedByUser = this.isLikedByUser(post, loggedUserId);
            var user = this.getUserOfPost(post);
            var obj = {
                content: post.content,
                publishDate: post.publishDate,
                user: user,
                id: post.id.toString(),
                parentId: post.parentId,
                comments: comments,
                likes: likes,
                likedByUser: likedByUser,
            };
            ls.push(obj);
        }
        return ls;
    }
    getUserOfPost(post) {
        var userPost = post.user;
        var user = {
            name: userPost.get('name'),
            userName: userPost.get('userName'),
            id: userPost.get('id').toString(),
        };
        return user;
    }
    isLikedByUser(post, userId) {
        if (post.likes == null) {
            return false;
        }
        var likedByUser = post.likes.filter((like) => like.userId.equals(userId)).length > 0;
        return likedByUser;
    }
    getTotalComments(post) {
        var _a;
        var comments = 0;
        if (post.comments != null) {
            comments = (_a = post.comments) === null || _a === void 0 ? void 0 : _a.length;
        }
        return comments;
    }
    getTotalLikes(post) {
        var _a;
        var likes = 0;
        if (post.likes != null) {
            likes = (_a = post.likes) === null || _a === void 0 ? void 0 : _a.length;
        }
        return likes;
    }
}
exports.default = GetFeedPostsCase;
