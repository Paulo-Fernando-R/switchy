import { inject, injectable } from "inversify";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { UnableDeletePostError } from "../errors/postErrors";
import "reflect-metadata";

@injectable()
export default class DeletePostCase {
    private readonly postRepository: IPostRepository;
    constructor(@inject('PostRepository') postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(postId: string) {
        try {
            await this.postRepository.deletePost(postId);
        } catch (error) {
            throw new UnableDeletePostError();
        }
    }
}
