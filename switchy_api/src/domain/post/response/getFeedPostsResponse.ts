interface IGetFeedPostsResponse {
    id: String;
    user: IGetFeedPostsUserResponse;
    parentId?: string;
    publishDate: Date;
    content: string;
    comments: Number;
    likes: Number;
    likedByUser: Boolean;
}

interface IGetFeedPostsUserResponse {
    id: string;
    userName: string;
    name: string;
}

export { IGetFeedPostsResponse, IGetFeedPostsUserResponse };