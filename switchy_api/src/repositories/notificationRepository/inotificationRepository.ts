import { INotification } from "../../models/notification";

export default interface INotificationRepository {
    markWithReader(ids: string[]): Promise<void>;
    create(notification: INotification): Promise<void>;
    getRecentsByReciever(userId: string, page: number): Promise<INotification[]>;
}