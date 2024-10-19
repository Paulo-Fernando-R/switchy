import { JwtPayload } from "jsonwebtoken";

export default interface ITokenService {
    isValid(token: string): JwtPayload;
    create(userId: string, expiration: string): string;
}