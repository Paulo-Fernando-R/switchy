import { Types } from "mongoose";
import DatabaseConnection from "../../database/databaseConnection";
import { Notification } from "../../models/notification";
import INotificationRepository from "./inotificationRepository";
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export default class NotificationRepository extends DatabaseConnection implements INotificationRepository {
    async getByUserAndDate(userId: string, date: Date): Promise<[]> {
        const notifications = Notification.find({
            'receiver.id': new Types.ObjectId(userId),
            createdAt: { '$gte': date }
        }, null, null);

        console.log(notifications);

        return [];
    }
}