import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import Post from "../../models/post";
import CreateCommentCase from "../../cases/createCommentCase/createCommentCase";
import ICreateCommentCase from "../../cases/createCommentCase/IcreateCommentCase";

export default class CommentsController {
    private readonly repository: IPostRepository;
    private readonly createCommentCase: ICreateCommentCase;
    constructor() {
        this.repository = new PostRepository();
        this.createCommentCase = new CreateCommentCase();
    }

    async getComments(id: string) {
        const response = await this.repository.getPostComments(id);

        return response;
    }

    async createComment(
        content: string,
        parentId: string,
        refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Post[], Error>>,
        setContent: React.Dispatch<React.SetStateAction<string>>,
        updateOne: (post: Post) => void
    ) {
        await this.createCommentCase.execute(content, parentId);
        const res = await this.repository.getPostById(parentId);
        updateOne(res);
        refetch();
        setContent("");

        return true;
    }
}
