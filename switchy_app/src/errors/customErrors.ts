export class CustomError extends Error {
    code?: number;
    screenMessage?: string;
    constructor(code?: number, message?: string, screenMessage?: string) {
        super(message);
        this.message = message ?? "";
        this.code = code;
        this.screenMessage = screenMessage;
    }
}

export class BadRequestError extends CustomError {
    constructor(code?: number, message?: string, screenMessage?: string) {
        super(code, message, screenMessage);
        this.code = code ? code : 400;
        this.screenMessage = screenMessage ? screenMessage : "Dados incompletos";
        this.message = message ? message : "Bad request";
    }
}

export class NotFoundError extends CustomError {
    constructor(code?: number, message?: string, screenMessage?: string) {
        super(code, message, screenMessage);
        this.code = code ? code : 404;
        this.screenMessage = screenMessage ? screenMessage : "Dados não encontrados";
        this.message = message ? message : "Not found";
    }
}

export class InternalServerError extends CustomError {
    constructor(code?: number, message?: string, screenMessage?: string) {
        super(code, message, screenMessage);
        this.code = code ? code : 500;
        this.screenMessage = screenMessage ? screenMessage : "Erro interno do servidor";
        this.message = message ? message : "Internal server error";
    }
}

export class UnauthorizedError extends CustomError {
    constructor(code?: number, message?: string, screenMessage?: string) {
        super(code, message, screenMessage);
        this.code = code ? code : 401;
        this.screenMessage = screenMessage ? screenMessage : "Não autorizado";
        this.message = message ? message : "Unauthorized";
    }
}

export class NetworkError extends CustomError {
    constructor(code?: number, message?: string, screenMessage?: string) {
        super(code, message, screenMessage);
        this.code = code ? code : 503;
        this.screenMessage = screenMessage ? screenMessage : "Erro na rede";
        this.message = message ? message : "Service unavailable";
    }
}
