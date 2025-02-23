export default interface INotificationMarkAsReadCase {
    execute(ids: string[]): Promise<void>;
}
