import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class SearchProfileController {
    private repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }
    async getPosts(userId: string) {
        const posts = await this.repository.getUserPosts(userId);

        return posts;
    }
}
