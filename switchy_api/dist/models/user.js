"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, ref: "id", required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: false },
    password: { type: String, required: false },
    createdAt: { type: Number, default: Date.now() },
    following: [{ userId: { type: mongoose_1.Types.ObjectId, required: false, defalt: [] } }],
    followers: [{ userId: { type: mongoose_1.Types.ObjectId, required: false, defalt: [] } }],
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
