import GetUserDataCase from "../../cases/getUserDataCase/getUserDataCase";
import IgetUserDataCase from "../../cases/getUserDataCase/IgetUserDataCase";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class HomeController {
    private readonly repository: IPostRepository;
    private readonly getUserDataCase: IgetUserDataCase;
    placeholderData: number[];
    constructor() {
        this.repository = new PostRepository();
        this.getUserDataCase = new GetUserDataCase();
        this.placeholderData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    async getFeedData() {
        return await this.repository.getFeedPosts();
    }

    async getAppData() {
        const response = await this.getFeedData();
        await this.getUserData();
        return response.sort((a, b) => (a.publishDate.getTime() < b.publishDate.getTime() ? 1 : -1));
    }

    async getUserData() {
        return await this.getUserDataCase.execute();
    }
}
