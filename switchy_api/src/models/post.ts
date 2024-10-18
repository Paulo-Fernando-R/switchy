import { Schema, Types, model } from "mongoose";
import { IUser, User, userSchema } from "./user";

export interface IPost {
    id?: Types.ObjectId;
    user: IUser;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments?: { postId: string }[];
    likes?: { userId: string }[];
}

const postSchema = new Schema<IPost>({
    id: { type: Schema.Types.ObjectId, ref: "id", required: false },
    user: { type: Map, required: false, default: null },
    parentId: { type: String, required: false, default:null },
    publishDate: { type: Date, default: new Date(Date.now()) },
    content: { type: String, required: true },
    comments: [{ postId: { type: String, required: false, defalt: [] } }],
    likes: [{ userId: { type: String, required: false, defalt: [] } }],
});

export const Post = model<IPost>("Post", postSchema);
