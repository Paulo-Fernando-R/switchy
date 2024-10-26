import { MissingData } from "../../errors/customErrors";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import ICreatePostCase from "./IcreatePostCase";

export default class CreatePostCase implements ICreatePostCase {
    private readonly repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async execute(content: string) {
        if (content.length < 3) {
            throw new MissingData(0, "Escreva sua publicação", "");
        }
        try {
            await this.repository.newPost(content);
        } catch (error) {
            throw error;
        }
    }
}
