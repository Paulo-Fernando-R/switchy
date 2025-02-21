import GetNotificationsCase from "../../cases/getNotificationsCase/getNotificationsCase";

export default class NotificationsController {
    placeholderData: any[];
    constructor() {
        this.placeholderData = [null, null, null, null];
    }

    async getNotifications(pageParam: number) {
        const datas = await new GetNotificationsCase().execute(pageParam);
        return datas;
    }

    handleNext(lastPage: Notification[], pages: Notification[][], lastPageParam: number) {
        if (lastPage.length < 10) {
            return;
        }
        return lastPageParam + 1;
    }
}
