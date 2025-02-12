import Notification from "../../models/notification";

export default interface IGetNotificationsCase {
    execute(limit: number, skip: number): Promise<Notification[]>;
}
