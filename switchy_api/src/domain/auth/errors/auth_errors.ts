export abstract class AuthError extends Error {}

export class AuthEmptyFieldsError extends AuthError {}

export class AuthInvalidEmailError extends AuthError {}

export class AuthInvalidPasswordError extends AuthError {}

export class AuthNotFoundError extends AuthError {}