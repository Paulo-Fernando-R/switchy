import { IUser } from "../../../models/user";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class UpdateUserPostsCase {
    private postRepository: IPostRepository;

    constructor(@inject('PostRepository') postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(userId: string, user: IUser): Promise<void> {
        this.postRepository.updateUserPost(userId, user);
    }
}