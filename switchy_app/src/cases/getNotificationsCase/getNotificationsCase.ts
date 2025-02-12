import { CustomError } from "../../errors/customErrors";
import Notification from "../../models/notification";
import INotificationsRepository from "../../repositories/notificationsRepository/InotificationsRepository";
import NotificationsRepository from "../../repositories/notificationsRepository/notificationsRepository";
import IGetNotificationsCase from "./IgetNotificationsCase";

export default class GetNotificationsCase implements IGetNotificationsCase {
    private readonly repository: INotificationsRepository;

    constructor() {
        this.repository = new NotificationsRepository();
    }

    async execute(limit: number, skip: number): Promise<Notification[]> {
        try {
            return await this.repository.getAll(limit, skip);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }

            throw error;
        }
    }
}
