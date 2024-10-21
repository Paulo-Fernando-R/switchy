import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class PostFeedItemController {
    private readonly repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async addLike(postId: string) {
        await this.repository.addLike(postId);
    }

    async getById(postId: string) {
        return await this.repository.getPostById(postId);
    }

    async handleLike(postId: string, setLiked: React.Dispatch<React.SetStateAction<boolean>>) {
        try {
            await this.addLike(postId);
            const response = await this.getById(postId);

            setLiked(true);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
