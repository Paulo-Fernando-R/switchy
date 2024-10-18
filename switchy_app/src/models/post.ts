import User from "./user";

export default interface Post {
    id?: string;
    user: User;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments?: { postId: string }[];
    likes?: { userId: string }[];
}
