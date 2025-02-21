import GetNotificationsCase from "../../cases/getNotificationsCase/getNotificationsCase";

export default class NotificationsController {
    placeholderData: any[];
    constructor(){
        this.placeholderData = [null, null, null, null];
    }
    async load() {
        // TODO: Carregas as notificações salvas localmente
        // Caso não exista, buscar todas as notificações na API
    }

    async getNotifications(pageParam: number) {
    
        const datas = await new GetNotificationsCase().execute(pageParam);
      //  console.log(datas);
        return datas;
    }

     handleNext(lastPage: Notification[], pages: Notification[][], lastPageParam: number) {
            if (lastPage.length < 10) {
                return;
            }
            return lastPageParam + 1;
        }
}
