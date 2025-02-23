import DatabaseConnection from "../../database/databaseConnection";
import { INotification, Notification } from "../../models/notification";
import INotificationRepository from "./inotificationRepository";
import "reflect-metadata";
import { injectable } from "inversify";
import { Types } from "mongoose";

@injectable()
export default class NotificationRepository extends DatabaseConnection implements INotificationRepository {
    async getRecentsByReciever(userId: string, page: number): Promise<INotification[]> {
        const skip = (page - 1) * 10;
        const notifications = await Notification.find({
            'receiver.id': new Types.ObjectId(userId),
        }).sort({ createdAt: -1 }).skip(skip).limit(10);
        const res: INotification[] = notifications.map((x) => {
            return {
                id: x._id,
                content: x.content,
                createdAt: x.createdAt,
                read: x.read,
                receiver: x.receiver,
                sender: x.sender,
                type: x.type,
            };
        });
        return res;
    }

    async markWithReader(ids: string[]): Promise<void> {
        await Notification.updateMany({ 
            "_id": { 
                $in: ids 
            } 
        }, { 
            $set: { 
                read: true 
            } 
        }, { 
            multi: true 
        });
    }

    async create(notification: INotification): Promise<void> {
        await this.connect();
        await Notification.create(notification);
    }
}