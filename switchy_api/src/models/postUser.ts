import { Types } from "mongoose";

export default interface IPostUser {
    id: Types.ObjectId;
    userName: string;
    name: string;
};