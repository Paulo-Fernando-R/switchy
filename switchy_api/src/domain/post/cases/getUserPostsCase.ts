import ServerError from "../../../errors/serverError";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError } from "../errors/postErrors";

export default class GetUserPostsCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(userId: string) {
        try {
            const response = await this.postRepository.getUserPosts(userId);
            return response;
        } catch (error) {
            console.error(error);
            throw new ServerError();
        }
    }
}
