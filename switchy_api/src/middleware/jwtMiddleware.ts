import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import "dotenv/config";

class JwtMiddleware {
    private readonly secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET!;
    }

    veryfyJWT(request: Request, response: Response, next: NextFunction) {
        const token = request.headers["authorization"];
        const secret = process.env.JWT_SECRET!;
        jwt.verify(token!, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return response.status(401).end("unauthorized");
            }

            decoded = decoded as JwtPayload;
            request.userId = decoded!.userId;

            next();
        });
    }

    isValid(token: string): JwtPayload {
        var result = jwt.verify(token!, this.secret);

        result = result as JwtPayload;

        return result;
    }

    createJWT(userId: string, expiration: string) {
        const token = jwt.sign({ userId: userId }, this.secret!, {
            expiresIn: expiration,
        });
        return token;
    }
}

export default new JwtMiddleware();
