export abstract class PostError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class PostEmptyValueError extends PostError {}

export class UnableCreatePostError extends PostError {}

export class UnableGetPostError extends PostError {}

export class UnableDeletePostError extends PostError {}