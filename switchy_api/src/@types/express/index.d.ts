declare namespace Express{

    interface Request {
        userId: string
    }
}

declare namespace jwt{

    interface JwtPayload {
        userId: string
        iat: number
        exp: number
    }
}