import { randomBytes } from "crypto";
import IGeneratePasswordService from "./igeneratePasswordService";

export default class GeneratePasswordService implements IGeneratePasswordService {
    generateHex(length: number): string {
        return randomBytes(length / 2).toString('hex');
    }
}