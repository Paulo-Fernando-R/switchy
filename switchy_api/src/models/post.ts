import { Schema, Types, model } from "mongoose";
import { IUser, User, userSchema } from "./user";

export interface IPost {
    id?: Types.ObjectId;
    user: IUser;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments?: { postId: Types.ObjectId }[];
    likes: { userId: Types.ObjectId }[];
}

const postSchema = new Schema<IPost>({
    id: { type: Schema.Types.ObjectId, ref: "id", required: false },
    user: { type: Map, required: false, default: null },
    parentId: { type: String, required: false, default:null },
    publishDate: { type: Date, default: new Date(Date.now()) },
    content: { type: String, required: true },
    comments: [{ postId: { type: Schema.Types.ObjectId, required: false, defalt: [] } }],
    likes: [{ userId: { type: Schema.Types.ObjectId, required: false, defalt: [] } }],
});

export const Post = model<IPost>("Post", postSchema);
