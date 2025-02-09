import { INotification } from "../../models/notification";

export default interface INotificationRepository {
    getByUserAndDate<T>(userId: string, date: Number): Promise<INotification<T>[]>;
    markWithReader(ids: string[]): Promise<void>;
    create(notification: INotification): Promise<void>;
    getRecentsByReciever(userId: string, numberOfEntries: number): Promise<INotification[]>;
}