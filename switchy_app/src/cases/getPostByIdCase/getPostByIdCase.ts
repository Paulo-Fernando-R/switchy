import { CustomError } from "../../errors/customErrors";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class GetPostByIdCase {
    private readonly postRepository: IPostRepository;
    constructor() {
        this.postRepository = new PostRepository();
    }
    async execute(id: string) {
        try {
            return await this.postRepository.getPostById(id);
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw new Error("Erro ao buscar post");
        }
    }
}
