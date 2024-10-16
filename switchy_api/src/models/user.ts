import { Schema, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password?: string;
    createdAt?: number;
    token?: string
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Number, default: Date.now() },
});

export const User = model<IUser>("User", userSchema);
