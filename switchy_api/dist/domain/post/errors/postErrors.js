"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableDeletePostError = exports.UnableGetPostError = exports.UnableCreatePostError = exports.PostEmptyValueError = exports.PostError = void 0;
class PostError extends Error {
}
exports.PostError = PostError;
class PostEmptyValueError extends PostError {
}
exports.PostEmptyValueError = PostEmptyValueError;
class UnableCreatePostError extends PostError {
}
exports.UnableCreatePostError = UnableCreatePostError;
class UnableGetPostError extends PostError {
}
exports.UnableGetPostError = UnableGetPostError;
class UnableDeletePostError extends PostError {
}
exports.UnableDeletePostError = UnableDeletePostError;
