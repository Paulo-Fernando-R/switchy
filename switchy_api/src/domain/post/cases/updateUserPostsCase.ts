import { IUser } from "../../../models/user";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";

export default class UpdateUserPostsCase {
    private postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userId: string, user: IUser): Promise<void> {
        this.postRepository.updateUserPost(userId, user);
    }
}