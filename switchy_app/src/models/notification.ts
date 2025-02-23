export default interface Notification {
    content: NotificationContent | null;
    createdAt: Date;
    id: string;
    read: boolean;
    receiver: NotificationUser;
    sender: NotificationUser;
    type: number;
}

export interface NotificationContent {
    text:string;
}

export interface NotificationUser {
    id: string;
    name: string;
    userName: string;
}