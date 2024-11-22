"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetFeedPostsResponse {
    constructor(posts) {
        this.posts = posts;
    }
    getLenghtOfPostsArray() {
        const convertedPosts = this.posts.map((post) => {
            var _a, _b;
            post.comments = Array.isArray(post.comments) ? (_a = post.comments) === null || _a === void 0 ? void 0 : _a.length : post.comments;
            post.likes = Array.isArray(post.likes) ? (_b = post.likes) === null || _b === void 0 ? void 0 : _b.length : post.likes;
            return post;
        });
        this.posts = convertedPosts;
    }
    setPostsLikedByUser(userId) {
        const posts = this.posts.map((post) => {
            post.likedByUser = false;
            if (post.likes.filter((like) => like.userId.equals(userId)).length > 0) {
                post.likedByUser = true;
            }
            return post;
        });
        this.posts = posts;
    }
    getResponse() {
        this.getLenghtOfPostsArray();
        return this.posts;
    }
}
exports.default = GetFeedPostsResponse;
