import { useContext, createContext } from "react";
import Post from "../models/post";

export type PostsListContextContent = {
    posts: Post[] | null;
    setPosts: (list: Post[] | null) => void;
    updateOne: (post: Post) => void;
};

export const PostListContext = createContext<PostsListContextContent>({
    posts: null,
    setPosts: () => {},
    updateOne: () => {},
});

export const usePostsListContext = () => useContext(PostListContext);
