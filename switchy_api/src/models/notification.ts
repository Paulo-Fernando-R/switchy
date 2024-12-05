import { model, Schema, Types } from "mongoose";
import INotificationUser from "./notificationUser";

export interface INotification {
    id?: Types.ObjectId;
    sender: INotificationUser;
    receiver: INotificationUser;
    type: Number;
    content: {};
    createdAt: Date;
    read: boolean;
}

export const notificationSchema = new Schema<INotification>({
    id: { type: Schema.Types.ObjectId, ref: "_id", required: false },
    sender: { type: Map, required: true },
    receiver: { type: Map, required: true },
    type: { type: Number, required: true },
    content: { type: Map, required: true },
    createdAt: { type: Date, required: true },
    read: { type: Boolean, default: false, required: false },
});

export const Notification = model<INotification>('Notification', notificationSchema);