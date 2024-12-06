import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import "reflect-metadata";

@injectable()
export default class MarkNotificationsWithReaderCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(ids: string[]) {
        await this.notificationRepository.markWithReader(ids);
    }
}