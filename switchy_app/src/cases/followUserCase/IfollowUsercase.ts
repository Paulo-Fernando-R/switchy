export default interface IfollowUserCase {
    execute(userId: string): Promise<void>;
}