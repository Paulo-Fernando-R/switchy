import INotificationUser from "../../../models/notificationUser";

export default interface INotificationResponse {
    id?: string;
    sender: INotificationUser;
    receiver: INotificationUser;
    type: Number;
    content: {}|null;
    createdAt: Date;
    read: boolean;
}