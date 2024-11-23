import { getTotalComments, getTotalLikes, isLikedByUser } from "../../../helpers/post/posthelpers";
import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IGetPostByIdResponse from "../response/getPostByIdResponse";

export default class getPostByIdCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string, loggedUserId: any) {
        const post = await this.postRepository.getPostById(postId);

        var comments = getTotalComments(post);
        var likes = getTotalLikes(post);
        var likedByUser = isLikedByUser(post, loggedUserId);

        var obj: IGetPostByIdResponse = {
            content: post.content,
            publishDate: post.publishDate,
            user: post.user,
            id: post.id!.toString(),
            parentId: post.parentId,
            comments: comments,
            likes: likes,
            likedByUser: likedByUser,
        };

        return obj;
    }
}
