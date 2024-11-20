import { IPost } from "../../../models/post";

export default class GetFeedPostsResponse {
    private posts: any[];
    constructor(posts: Array<IPost>) {
        this.posts = posts;
    }

    public getLenghtOfPostsArray(): void {
        const convertedPosts: any = this.posts.map((post: any) => {
            post.comments = Array.isArray(post.comments) ? post.comments?.length : post.comments;
            post.likes = Array.isArray(post.likes) ? post.likes?.length : post.likes;
            return post;
        })
    
        this.posts = convertedPosts;
    }

    public setPostsLikedByUser(userId: any): void {

        const posts = this.posts.map((post: any) => {
            post.likedByUser = false;
            if (post.likes.filter((like: any) => like.userId.equals(userId)).length > 0) {
                post.likedByUser = true
            }
            return post
        })
        this.posts = posts;
    }

    public getResponse(){
        this.getLenghtOfPostsArray();
        return this.posts
    }
}