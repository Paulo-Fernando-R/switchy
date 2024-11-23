import DeletePostCase from "../../cases/deletePostCase/deletePostCase";
import IDeletePostCase from "../../cases/deletePostCase/IdeletePostCase";
import Post from "../../models/post";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class UserController {
    private repository: IPostRepository;
    private deletePostCase: IDeletePostCase;
    placeholderData: any[];

    constructor() {
        this.repository = new PostRepository();
        this.placeholderData = [null, null, null, null, null, null, null, null];
        this.deletePostCase = new DeletePostCase();
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

    async deletePost(
        postId: string | undefined,
        posts: Post[] | null,
        setPopup: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        if (!postId) return;

        try {
            setPopup(false);
            await this.deletePostCase.execute(postId);
            posts?.splice(
                posts.findIndex((post) => post.id === postId),
                1
            );
        } catch (error) {
            throw error;
        }
    }
}
