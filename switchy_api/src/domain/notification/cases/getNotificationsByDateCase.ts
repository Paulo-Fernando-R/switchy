import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import "reflect-metadata";

@injectable()
export default class GetNotificationsByDateCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(userId: string, date: Date): Promise<[]> {
        const maps = this.notificationRepository.getByUserAndDate(userId, date);
        return maps;
    }
}