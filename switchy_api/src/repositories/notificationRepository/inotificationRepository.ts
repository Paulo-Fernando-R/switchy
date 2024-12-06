import { INotification } from "../../models/notification";

export default interface INotificationRepository {
    getByUserAndDate(userId: string, date: Number): Promise<INotification[]>;
    markWithReader(ids: string[]): Promise<void>;
}