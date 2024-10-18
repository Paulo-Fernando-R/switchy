import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

class JwtMiddleware {
    private readonly secret = process.env.JWT_SECRET;

    constructor() {}

    veryfyJWT(request: Request, response: Response, next: NextFunction) {
        const secret = process.env.JWT_SECRET;
        const token = request.headers["authorization"];

        jwt.verify(token!, secret!, (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).end("unauthorized");
            }

            decoded = decoded as JwtPayload;
            request.userId = decoded!.userId;

            next();
        });
    }

    createJWT(userId: string, expiration: string) {
        const token = jwt.sign({ userId: userId }, this.secret!, {
            expiresIn: expiration,
        });
        return token;
    }
}

export default new JwtMiddleware();
