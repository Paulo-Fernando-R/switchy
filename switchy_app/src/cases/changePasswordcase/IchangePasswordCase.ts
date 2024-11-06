export default interface IChangePasswordCase {
    execute(oldPassword: string, newPassword: string, isValid: boolean): Promise<void>
}