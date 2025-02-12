import Notification from "../../models/notification";

export default interface INotificationsRepository {
    getAll(limit: number, skip: number): Promise<Notification[]>;
}