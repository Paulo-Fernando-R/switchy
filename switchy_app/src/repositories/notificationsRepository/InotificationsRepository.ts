import Notification from "../../models/notification";

export default interface INotificationsRepository {
    getAll(page: number): Promise<Notification[]>;
}