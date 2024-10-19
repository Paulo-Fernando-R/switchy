import { NetworkError, UnauthorizedError } from "../../errors/customErrors";
import Post from "../../models/post";
import axiosInstance from "../../services/customAxiosClient/customAxiosClient";
import IPostRepository from "./IpostRepository";

export default class PostRepository implements IPostRepository {
    async getPostComments(postId: string): Promise<Post[]> {
        const response = await axiosInstance.get<Post[]>("/getPostComments/" + postId);
        response.data.map((e) => {
            const aux = new Date(e.publishDate);
            e.publishDate = aux;
            return e;
        });

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new Error();
        }

        return response.data;
    }
    async getFeedPosts() {
        const response = await axiosInstance.get<Post[]>("/GetFeedPosts");
        response.data.map((e) => {
            const aux = new Date(e.publishDate);
            e.publishDate = aux;
            return e;
        });

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new Error();
        }

        return response.data;
    }

    async createPost(content: string, parentId: string) {
        const data = {
            content: content,
            parentId: parentId,
        };
        const response = await axiosInstance.post("/AddCommentPost", data);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new Error();
        }
    }
}
