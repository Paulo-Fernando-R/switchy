export abstract class PostError extends Error {}

export class PostEmptyValueError extends PostError {}

export class UnableCreatePostError extends PostError {}

export class UnableGetPostError extends PostError {}