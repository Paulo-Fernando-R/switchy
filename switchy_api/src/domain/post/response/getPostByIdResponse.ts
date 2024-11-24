import IPostUser from "../../../models/postUser";

export default interface IGetPostByIdResponse {
    id: String;
    user: IPostUser;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments: Number;
    likes: Number;
    likedByUser: Boolean;
}