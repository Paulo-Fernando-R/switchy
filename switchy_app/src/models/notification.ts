export default interface Notification {
    content: string | null;
    createdAt: string;
    id: string;
    read: boolean;
    receiver: NotificationUser;
    sender: NotificationUser;
    type: number;
}

export interface NotificationUser {
    id: string;
    name: string;
    userName: string;
}