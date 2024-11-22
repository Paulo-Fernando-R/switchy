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
exports.PostRepository = void 0;
const databaseConnection_1 = __importDefault(require("../../database/databaseConnection"));
const serverError_1 = __importDefault(require("../../errors/serverError"));
const post_1 = require("../../models/post");
const mongoose_1 = require("mongoose");
class PostRepository extends databaseConnection_1.default {
    constructor() {
        super();
    }
    getUserPosts(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const skip = (page - 1) * 10;
            try {
                yield this.connect();
                const list = yield post_1.Post.find({ "user.id": new mongoose_1.Types.ObjectId(userId) }, null, {
                    skip: skip,
                    limit: 10,
                    sort: { publishDate: -1 },
                });
                // console.log(list);
                const res = list.map((e) => {
                    return {
                        content: e.content,
                        publishDate: e.publishDate,
                        user: e.user,
                        id: e._id,
                        parentId: e.parentId,
                        comments: e.comments,
                        likes: e.likes,
                    };
                });
                return res;
            }
            catch (error) {
                console.error(error);
                //@ts-ignore
                throw new serverError_1.default((_a = error.message) !== null && _a !== void 0 ? _a : "");
            }
        });
    }
    addLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield post_1.Post.findByIdAndUpdate(postId, {
                $push: { likes: { userId: userId } },
            });
        });
    }
    removeLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield post_1.Post.findByIdAndUpdate(postId, {
                $pull: { likes: { userId: userId } },
            });
        });
    }
    getPostComments(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const res = yield post_1.Post.find({
                _id: {
                    $in: ids,
                },
            }).exec();
            const posts = res.map((e) => {
                const aux = {
                    content: e.content,
                    publishDate: e.publishDate,
                    user: e.user,
                    id: e._id,
                    parentId: e.parentId,
                    comments: e.comments,
                    likes: e.likes,
                };
                return aux;
            });
            return posts;
        });
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield this.connect();
                const newPost = new post_1.Post({
                    comments: post.comments,
                    content: post.content,
                    likes: post.likes,
                    parentId: post.parentId,
                    publishDate: post.publishDate,
                    user: post.user,
                });
                const created = yield newPost.save();
                if (!created) {
                    throw new serverError_1.default("unnable to insert");
                }
                const res = {
                    id: created.id,
                    user: created.user,
                    parentId: created.parentId,
                    publishDate: created.publishDate,
                    content: created.content,
                    comments: created.comments,
                    likes: created.likes,
                };
                console.log(res);
            }
            catch (error) {
                console.error(error);
                //@ts-ignore
                throw new serverError_1.default((_a = error.message) !== null && _a !== void 0 ? _a : "");
            }
        });
    }
    getFeedPosts(userId, page, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids || ids.length == 0) {
                return yield this.getFeedPostsWithoutCriteria(page);
            }
            return yield this.getFeedPostsWithCriteria(page, ids);
        });
    }
    getFeedPostsWithoutCriteria(page) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const skip = (page - 1) * 10;
            try {
                yield this.connect();
                const list = yield post_1.Post.find({ parentId: null }, null, {
                    skip: skip,
                    limit: 10,
                    sort: { publishDate: -1 },
                }).exec();
                console.log(list);
                const res = list.map((e) => {
                    return {
                        content: e.content,
                        publishDate: e.publishDate,
                        user: e.user,
                        id: e._id,
                        parentId: e.parentId,
                        comments: e.comments,
                        likes: e.likes,
                    };
                });
                return res;
            }
            catch (error) {
                console.error(error);
                //@ts-ignore
                throw new serverError_1.default((_a = error.message) !== null && _a !== void 0 ? _a : "");
            }
        });
    }
    getFeedPostsWithCriteria(page, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const skip = (page - 1) * 10;
            yield this.connect();
            try {
                const res = yield post_1.Post.find({ parentId: null }, null, {
                    _id: {
                        $in: ids,
                    },
                    skip: skip,
                    limit: 10,
                    sort: { publishDate: -1 },
                }).exec();
                const posts = res.map((e) => {
                    const aux = {
                        content: e.content,
                        publishDate: e.publishDate,
                        user: e.user,
                        id: e._id,
                        parentId: e.parentId,
                        comments: e.comments,
                        likes: e.likes,
                    };
                    return aux;
                });
                return posts;
            }
            catch (error) {
                console.error(error);
                //@ts-ignore
                throw new serverError_1.default((_a = error.message) !== null && _a !== void 0 ? _a : "");
            }
        });
    }
    addComment(parentId, content, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const newPost = new post_1.Post({
                content: content,
                parentId: parentId,
                user: {
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    id: new mongoose_1.Types.ObjectId(user.id),
                },
            });
            const res = yield newPost.save();
            const result = {
                id: res._id,
                user: res.user,
                publishDate: res.publishDate,
                content: res.content,
            };
            return result;
        });
    }
    addCommentsToPost(parentId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            yield post_1.Post.findByIdAndUpdate(parentId, {
                $push: { comments: { postId: commentId } },
            });
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                yield this.connect();
                const post = yield post_1.Post.findById(id).exec();
                //  console.log(post?.user);
                const res = {
                    id: post === null || post === void 0 ? void 0 : post._id,
                    content: (_a = post === null || post === void 0 ? void 0 : post.content) !== null && _a !== void 0 ? _a : "",
                    parentId: (_b = post === null || post === void 0 ? void 0 : post.parentId) !== null && _b !== void 0 ? _b : "",
                    publishDate: (_c = post === null || post === void 0 ? void 0 : post.publishDate) !== null && _c !== void 0 ? _c : new Date(),
                    user: post === null || post === void 0 ? void 0 : post.user,
                    comments: (_e = (_d = post === null || post === void 0 ? void 0 : post.comments) === null || _d === void 0 ? void 0 : _d.map((e) => {
                        return { postId: e.postId };
                    })) !== null && _e !== void 0 ? _e : [],
                    likes: (_f = post === null || post === void 0 ? void 0 : post.likes) !== null && _f !== void 0 ? _f : [],
                };
                return res;
            }
            catch (error) {
                console.error(error);
                //@ts-ignore
                throw new serverError_1.default((_g = error.message) !== null && _g !== void 0 ? _g : "");
            }
        });
    }
}
exports.PostRepository = PostRepository;
