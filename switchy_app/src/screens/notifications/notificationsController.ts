import GetNotificationsByDateCase from "../../cases/getNotificationsByDateCase/getNotificationsByDateCase";

export default class NotificationsController {
    async load() {
        // TODO: Carregas as notificações salvas localmente
        // Caso não exista, buscar todas as notificações na API
    }

    async refresh() {
        //const date = new Date().toISOString();
        const date = '2020-01-01T00:00:00'
        const datas = await new GetNotificationsByDateCase().execute(date);
        console.log(datas);
    }
}
