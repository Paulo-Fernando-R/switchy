import { model, Schema, Types } from "mongoose";
import INotificationUser from "./notificationUser";
import INotificationContent from "./notificationContent";

export interface INotification<T = INotificationContent> {
    id?: Types.ObjectId;
    sender: INotificationUser;
    receiver: INotificationUser;
    type: Number;

    createdAt?: number;
    content?: T | null;

    read: boolean;
}

export const notificationSchema = new Schema<INotification>({
    id: { type: Schema.Types.ObjectId, ref: "_id", required: false },
    sender: { type: Map, required: true },
    receiver: { type: Map, required: true },
    type: { type: Number, required: true },
    content: { type: Map, required: false, default: null },
    createdAt: { type: Number, required: false, default: Date.now() },
    read: { type: Boolean, default: false, required: false },
});

export const Notification = model<INotification>("Notifications", notificationSchema);
