import { Schema, Types, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    userName?: string;
    password?: string;
    createdAt?: Date;
    token?: string;
    id?: Types.ObjectId;
}

export const userSchema = new Schema<IUser>({
    id: { type: Schema.Types.ObjectId, ref: "id", required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: false, },
    password: { type: String, required: false },
    createdAt: { type: Number, default: Date.now() },
});

export const User = model<IUser>("User", userSchema);
