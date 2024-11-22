import IUserPost from "../entities/userPost";

export default interface IGetPostByIdResponse {
    id: String;
    user: IUserPost;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments: Number;
    likes: Number;
    likedByUser: Boolean;
}