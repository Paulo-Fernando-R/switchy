import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import "reflect-metadata";
import { INotification } from "../../../models/notification";

@injectable()
export default class GetNotificationsByDateCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(userId: string, dateStr: string): Promise<INotification[]> {
        const date = new Date(dateStr).getTime();
        const maps = this.notificationRepository.getByUserAndDate(userId, date);
        return maps;
    }
}