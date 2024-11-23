"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, ref: "id", required: false },
    user: { type: Map, required: false, default: null },
    parentId: { type: mongoose_1.Types.ObjectId, required: false, default: null },
    publishDate: { type: Date, default: new Date(Date.now()) },
    content: { type: String, required: true },
    comments: [{ postId: { type: mongoose_1.Types.ObjectId, required: false, default: null } }],
    likes: [{ userId: { type: mongoose_1.Types.ObjectId, required: false, default: null } }],
    deleted: { type: Boolean, default: false },
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
