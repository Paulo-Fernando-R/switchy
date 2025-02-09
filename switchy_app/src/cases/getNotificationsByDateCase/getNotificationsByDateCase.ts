import { CustomError } from "../../errors/customErrors";
import Notification from "../../models/notification";
import INotificationsRepository from "../../repositories/notificationsRepository/InotificationsRepository";
import NotificationsRepository from "../../repositories/notificationsRepository/notificationsRepository";
import IGetNotificationsByDateCase from "./IgetNotificationsByDateCase copy";

export default class GetNotificationsByDateCase implements IGetNotificationsByDateCase {
    private readonly repository: INotificationsRepository;

    constructor() {
        this.repository = new NotificationsRepository();
    }

    async execute(date: string): Promise<Notification[]> {
        try {
            return await this.repository.getAllByDate(date);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }

            throw error;
        }
    }
}
