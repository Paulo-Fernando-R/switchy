import GetNotificationsCase from "../../cases/getNotificationsCase/getNotificationsCase";
import Notification from "../../models/notification";

export default class NotificationsController {
    async loadNotifications(skip: number): Promise<Notification[]> {
        const limit = 10;
        const datas = await new GetNotificationsCase().execute(limit, skip);
        return datas
    }

    handleNext(lastPage: Notification[], pages: Notification[][]): number {
        return 0;
    }
}
