import GetNotificationsByDateCase from "../../cases/getNotificationsByDateCase/getNotificationsByDateCase";

export default class NotificationsController {
    async load() {
        //const date = new Date().toISOString();
        console.log('Started');
        const date = '2020-01-01T00:00:00'
        const datas = await new GetNotificationsByDateCase().execute(date);
        console.log(datas);
    }
}
