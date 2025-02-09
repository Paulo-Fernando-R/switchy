import Notification from "../../models/notification";

export default interface IGetNotificationsByDateCase {
    execute(date: string): Promise<Notification[]>;
}
