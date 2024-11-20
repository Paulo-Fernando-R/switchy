import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import Post from "../../models/post";
import CreateCommentCase from "../../cases/createCommentCase/createCommentCase";
import ICreateCommentCase from "../../cases/createCommentCase/IcreateCommentCase";
import IGetPostByIdCase from "../../cases/getPostByIdCase/IgetPostByIdCase";
import GetPostByIdCase from "../../cases/getPostByIdCase/getPostByIdCase";

export default class CommentsController {
    private readonly repository: IPostRepository;
    private readonly createCommentCase: ICreateCommentCase;
    private readonly getPostByIdCase: IGetPostByIdCase;
    constructor() {
        this.repository = new PostRepository();
        this.createCommentCase = new CreateCommentCase();
        this.getPostByIdCase = new GetPostByIdCase();
    }

    async getComments(id: string) {
        const response = await this.repository.getPostComments(id);

        return response;
    }

    async getMainPost(id: string) {
        const response = await this.getPostByIdCase.execute(id);
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
