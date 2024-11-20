import { IPost } from "../../../models/post";

export default class GetPostResponse {
    private post: any
    ;
    constructor(post: IPost) {
        this.post = post;
    }

    public getLenghtOfPostsArray(): void {
        if(Array.isArray(this.post.comments)){
            this.post.comments = this.post.comments.length;
        }
        if(Array.isArray(this.post.likes)){
            this.post.likes = this.post.likes.length;
        }
    }

    public setPostsLikedByUser(userId: any): void {
        this.post.likedByUser = false;
        if(this.post.likes.filter((like: any) => like.userId.equals(userId)).length > 0) {
            this.post.likedByUser = true
        }
    }

    public getResponse(){
        this.getLenghtOfPostsArray();
        return this.post
    }
}