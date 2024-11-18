import Post from "../../models/post";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class UserController {
    private repository: IPostRepository;
    placeholderData: any[];

    constructor() {
        this.repository = new PostRepository();
        this.placeholderData = [null, null, null, null, null, null, null, null];
    }
    async getPosts(userId: string, pageParam: number) {
        const posts = await this.repository.getUserPosts(userId, pageParam);
        return posts;
    }

    handleNext(lastPage: Post[], pages: Post[][], lastPageParam: number) {
        if (lastPage.length < 10) {
            return;
        }
        return lastPageParam + 1;
    }
}
