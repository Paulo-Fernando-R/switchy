import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class UserController {
    private repository: IPostRepository;
    placeholderData: any[]

    constructor() {
        this.repository = new PostRepository();
        this.placeholderData = [null, null, null, null, null, null, null, null];
    }
    async getPosts(userId: string) {
        const posts = await this.repository.getUserPosts(userId);

        return posts.sort((a,b) => a.publishDate.getTime() < b.publishDate.getTime() ? 1:-1)
    }
}
