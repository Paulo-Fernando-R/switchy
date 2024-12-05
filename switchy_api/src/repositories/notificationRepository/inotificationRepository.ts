export default interface INotificationRepository {
    getByUserAndDate(userId: string, date: Date): Promise<[]>;
}