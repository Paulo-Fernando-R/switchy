import { Schema, Types, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    description?: string;
    userName?: string;
    password?: string;
    createdAt?: Date;
    token?: string;
    id?: Types.ObjectId;
    following?: { userId: string }[];
    followers?: { userId: string }[];
    deleted?: boolean;
}

export const userSchema = new Schema<IUser>({
    id: { type: Schema.Types.ObjectId, ref: "id", required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: false },
    userName: { type: String, required: false },
    password: { type: String, required: false },
    createdAt: { type: Number, default: Date.now() },
    following: [{ userId: { type: Types.ObjectId, required: false, defalt: [] } }],
    followers: [{ userId: { type: Types.ObjectId, required: false, defalt: [] } }],
    deleted: { type: Boolean, default: false }
});

export const User = model<IUser>("User", userSchema);
