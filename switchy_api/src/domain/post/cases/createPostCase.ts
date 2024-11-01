import { Types } from "mongoose";
import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError, UnableCreatePostError } from "../errors/postErrors";
import GetUserByIdCase from "../../user/cases/getUserByIdCase";
import { UserRepository } from "../../../repositories/userRepository/userRepository";
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
        const post: IPost = {
            user: {
                email: user.email,
                name: user.name,
                userName: user.userName,
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
            console.error(error);
            throw new UnableCreatePostError();
        }
    }
}
