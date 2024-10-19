export abstract class AuthError extends Error {}

export class AuthEmptyFieldsError extends AuthError {}

export class AuthInvalidTokenError extends AuthError {}