import { useContext, createContext } from "react";
import Post from "../models/post";
import { ListContextContent } from "./listContextContent";

export const PostListContext = createContext<ListContextContent<Post>>({
    values: null,
    setValues: () => {},
    updateOne: () => {},
});

export const usePostsListContext = () => useContext(PostListContext);
