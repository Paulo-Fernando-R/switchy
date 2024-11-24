import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError, UnableCreatePostError } from "../errors/postErrors";
import IPostUser from "../../../models/postUser";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class CreatePostCase {
    private readonly postRepository: IPostRepository;

    constructor(@inject('PostRepository') _postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(parentId: string, content: string, postUser: IPostUser) {
        if (!content) {
            throw new PostEmptyValueError();
        }

        const post: IPost = {
            user: postUser,
            comments: [],
            likes: [],
            content: content,
            publishDate: new Date(Date.now()),
            parentId: parentId ? parentId : undefined,
        };

        try {
            await this.postRepository.createPost(post);
        } catch (error) {
            throw new UnableCreatePostError();
        }
    }
}
