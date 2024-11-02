import IEncryptService from "./iencryptService";
import bcrypt from "bcrypt";
import "dotenv/config";


export default class EncryptServiceBcrypt implements IEncryptService {
    constructor(){

    }

    async hashPassword(password: string): Promise<string> {

        let hashedPassword = '';

        const saltRounds: number = parseInt(process.env.ENCRYPT_SALT || '10', 10);

        hashedPassword = await bcrypt.hash(password, saltRounds);
    
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}