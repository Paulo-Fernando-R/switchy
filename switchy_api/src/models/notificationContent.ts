import { Types } from "mongoose";

export default interface INotificationContent {
    title: string;
    text: string;
    triggerEntityId: Types.ObjectId;
}
