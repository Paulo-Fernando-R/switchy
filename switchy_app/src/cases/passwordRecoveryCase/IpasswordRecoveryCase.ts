export default interface IPasswordRecoveryCase {
    execute(email: string): Promise<void>;
}
