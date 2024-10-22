import GetUserDataCase from "../../cases/getUserDataCase/getUserDataCase";
import IgetUserDataCase from "../../cases/getUserDataCase/IgetUserDataCase";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class HomeController {
    private readonly repository: IPostRepository;
    private readonly getUserDataCase: IgetUserDataCase;
    constructor() {
        this.repository = new PostRepository();
        this.getUserDataCase = new GetUserDataCase();
    }

    async getFeedData() {
        return await this.repository.getFeedPosts();
    }

    async getAppData() {
        const response = await this.getFeedData();
        await this.getUserData();
        return response;
    }

    async getUserData() {
        return await this.getUserDataCase.execute();
    }
}
