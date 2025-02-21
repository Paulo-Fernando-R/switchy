import Notification from "../../models/notification";

export default interface IGetNotificationsCase {
    execute(page: number): Promise<Notification[]>;
}
