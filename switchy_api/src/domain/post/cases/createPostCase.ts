import { Types } from "mongoose";
import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostRepository } from "../../../repositories/postRepository/postRepository";
import { PostEmptyValueError, UnableCreatePostError } from "../errors/postErrors";

export default class CreatePostCase {
    postRepository: IPostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async execute(parentId: string, content: string, userId: string) {
        if (!content) {
            throw new PostEmptyValueError();
        }

        const post: IPost = {
            user: {
                email: "email",
                name: "name",
                id: new Types.ObjectId(userId as string),
            },
            comments: [],
            likes: [],
            content: content,
            publishDate: new Date(Date.now()),
            //@ts-ignore
            parentId: parentId ? parentId : null,
        };

        try {
            await this.postRepository.createPost(post);
           
        } catch (error) {
            throw new UnableCreatePostError();
        }
    }
}
