import IEncryptService from "./iencryptService";
import bcrypt from "bcrypt";
import "dotenv/config";


export default class EncryptServiceBcrypt implements IEncryptService {
    constructor(){

    }

    hashPassword(password: string): any {
        const saltRounds: any = process.env.ENCRYPT_SALT;
        bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
            bcrypt.hash(password, salt, (err: any, hash: any) => {
                return Promise.resolve(hash);
            });
        });
    }

    comparePassword(password: string): Promise<boolean> {
        // TODO: Implement password validation
        return Promise.resolve(true);
    }
}