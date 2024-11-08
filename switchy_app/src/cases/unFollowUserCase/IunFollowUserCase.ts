export default interface IUnFollowUserCase {
    execute(userId: string): Promise<void>;
}
