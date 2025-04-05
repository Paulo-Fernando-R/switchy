import GetNotificationsCase from "../../cases/getNotificationsCase/getNotificationsCase";
import NotificationMarkAsReadCase from "../../cases/notificationMarkAsReadCase/notificationMarkAsReadCase";

export default class NotificationsController {
    placeholderData: any[];
    constructor() {
        this.placeholderData = [null, null, null, null];
    }

    async getNotifications(pageParam: number) {
        const datas = await new GetNotificationsCase().execute(pageParam);
       
        return datas;
    }

    async markAsRead(ids: string[]) {
        await new NotificationMarkAsReadCase().execute(ids);
    }

    handleNext(lastPage: Notification[], pages: Notification[][], lastPageParam: number) {
        if (lastPage.length < 10) {
            return;
        }
        return lastPageParam + 1;
    }
}
