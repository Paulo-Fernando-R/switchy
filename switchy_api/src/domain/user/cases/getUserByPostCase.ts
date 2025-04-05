import { inject, injectable } from "inversify";
import "reflect-metadata";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IPostUser from "../../../models/postUser";

@injectable()
export default class GetUserByPostIdCase {

    private readonly postRepository: IPostRepository;

    constructor(@inject('PostRepository') postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(postId: string): Promise<IPostUser | null> {
        const user = await this.postRepository.getUserFromPost(postId);
        return user;
    }
}