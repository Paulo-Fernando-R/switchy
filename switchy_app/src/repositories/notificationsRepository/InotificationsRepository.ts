import Notification from "../../models/notification";

export default interface INotificationsRepository {
    getAllByDate(date: string): Promise<Notification[]>;
}