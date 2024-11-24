import jwt, { JwtPayload } from "jsonwebtoken";
import ITokenService from "./itokenService";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class JwtTokenService implements ITokenService {
    private readonly secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET!;
    }

    isValid(token: string): JwtPayload {
        var result = jwt.verify(token!, this.secret);

        result = result as JwtPayload;

        return result;
    }

    create(userId: string, expiration: string): string {
        const token = jwt.sign(
            {
                userId: userId,
            },
            this.secret,
            {
                expiresIn: expiration,
            }
        );

        return token;
    }
}
