import { NetworkError, UnauthorizedError } from "../../errors/customErrors";
import Notification from "../../models/notification";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";
import INotificationsRepository from "./InotificationsRepository";

export default class NotificationsRepository implements INotificationsRepository {
    private axios: ICustomAxiosClient;

    constructor() {
        this.axios = new CustomAxiosClient();
    }

    async getAll(page: number): Promise<Notification[]> {
        const response = await this.axios.instance.get<Notification[]>(`/Notifications/${page}`);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new Error();
        }

        const data = response.data;
        data.forEach((notification) => (notification.createdAt = new Date(notification.createdAt)));
        return data;
    }
}
