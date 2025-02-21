import GetNotificationsCase from "../../cases/getNotificationsCase/getNotificationsCase";

export default class NotificationsController {
    async load() {
        // TODO: Carregas as notificações salvas localmente
        // Caso não exista, buscar todas as notificações na API
    }

    async refresh() {
        const limit = 10;
        const skip = 0;
        const datas = await new GetNotificationsCase().execute(limit, skip);
      //  console.log(datas);
    }
}
