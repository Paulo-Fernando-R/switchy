import { Schema, Types, model } from "mongoose";
import { IUser, User, userSchema } from "./user";

export interface IPost {
    id?: Types.ObjectId;
    user: any;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments?: { postId: string }[];
    likes?: { userId: string }[];
    deleted?: boolean;
}

const postSchema = new Schema<IPost>({
    id: { type: Schema.Types.ObjectId, ref: "id", required: false },
    user: { type: Map, required: false, default: null },
    parentId: { type: Types.ObjectId, required: false, default: null },
    publishDate: { type: Date, default: new Date(Date.now()) },
    content: { type: String, required: true },
    comments: [{ postId: { type: Types.ObjectId, required: false, default: null } }],
    likes: [{ userId: { type: Types.ObjectId, required: false, default: null } }],
    deleted: { type: Boolean, default: false },
});

export const Post = model<IPost>("Post", postSchema);
