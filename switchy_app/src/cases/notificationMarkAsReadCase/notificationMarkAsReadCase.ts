import { CustomError, InternalServerError } from "../../errors/customErrors";
import Notification from "../../models/notification";
import INotificationsRepository from "../../repositories/notificationsRepository/InotificationsRepository";
import NotificationsRepository from "../../repositories/notificationsRepository/notificationsRepository";
import INotificationMarkAsReadCase from "./InotificationMarkAsReadCase";

export default class NotificationMarkAsReadCase implements INotificationMarkAsReadCase {
    private readonly repository: INotificationsRepository;

    constructor() {
        this.repository = new NotificationsRepository();
    }

    async execute(ids: string[]): Promise<void> {
        try {
            await this.repository.markAsRead(ids);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }

            throw new InternalServerError();
        }
    }
}
