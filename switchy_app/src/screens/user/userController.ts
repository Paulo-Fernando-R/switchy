import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class UserController {
    private repository: IPostRepository;
    placeholderData: number[]

    constructor() {
        this.repository = new PostRepository();
        this.placeholderData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    async getPosts(userId: string) {
        const posts = await this.repository.getUserPosts(userId);

        return posts.sort((a,b) => a.publishDate.getTime() < b.publishDate.getTime() ? 1:-1)
    }
}
