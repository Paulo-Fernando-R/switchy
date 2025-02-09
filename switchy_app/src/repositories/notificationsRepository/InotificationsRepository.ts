export default interface INotificationsRepository {
    getAllByDate(date: string): Promise<Notification[]>;
}