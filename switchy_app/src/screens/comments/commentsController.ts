import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import Post from "../../models/post";

export default class CommentsController {
    private readonly repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async getComments(id: string) {
        const response = await this.repository.getPostComments(id);

        return response;
    }

    async createComment(
        content: string,
        parentId: string,
        refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Post[], Error>>,
        setContent: React.Dispatch<React.SetStateAction<string>>
    ) {
        if (content.length < 3) {
            return;
        }

        try {
            await this.repository.createPost(content, parentId);
            refetch();
            setContent("");
        } catch (error) {}
    }
}
