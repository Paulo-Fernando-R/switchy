import { CustomError, MissingData } from "../../errors/customErrors";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class DeletePostCase {
    private readonly repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async execute(postId: string) {
        try {
            await this.repository.deletePost(postId);
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw new Error("Erro ao deletar publicação");
        }
    }
}
