export default interface IEncryptService {
    hashPassword(password:string):Promise<string>;
    comparePassword(password:string):Promise<boolean>;
}