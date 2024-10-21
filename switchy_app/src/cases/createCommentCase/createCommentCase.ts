import { MissingData } from "../../errors/customErrors";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import ICreateCommentCase from "./IcreateCommentCase";

export default class CreateCommentCase implements ICreateCommentCase {
    private readonly repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async execute(content: string, parentId: string) {
        if (content.length < 3) {
            throw new MissingData(0, "Escreva seu comentário", "");
        }
        try {
            await this.repository.createPost(content, parentId);
        } catch (error) {
            throw error;
        }
    }
}
