import { Types } from "mongoose";
import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError, UnableCreatePostError } from "../errors/postErrors";
import GetUserByIdCase from "../../user/cases/getUserByIdCase";
import { UserRepository } from "../../../repositories/userRepository/userRepository";
import IPostUser from "../../../models/postUser";

export default class CreatePostCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(parentId: string, content: string, userId: string) {
        if (!content) {
            throw new PostEmptyValueError();
        }
        const user = await new GetUserByIdCase(new UserRepository()).execute(userId);

        if (!user) {
            throw new UnableCreatePostError();
        }

        var postUser: IPostUser = {
            id: new Types.ObjectId(user.id.toString()),
            name: user.name,
            userName: user.userName,
        };

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
            console.error(error);
            throw new UnableCreatePostError();
        }
    }
}
