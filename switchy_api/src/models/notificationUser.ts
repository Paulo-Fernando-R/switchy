import { Types } from "mongoose";

export default interface INotificationUser {
    id: Types.ObjectId;
    name: string;
    userName: string;
}