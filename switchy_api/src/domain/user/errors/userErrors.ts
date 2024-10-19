export abstract class UserError extends Error {}

export class UserEmptyFieldsError extends UserError {}

export class UserNotFoundError extends UserError {}

export class UserInvalidEmailError extends UserError {}

export class UserInvalidPasswordError extends UserError {}