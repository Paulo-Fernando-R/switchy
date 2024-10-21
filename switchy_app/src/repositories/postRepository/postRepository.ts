import { InternalServerError, NetworkError, UnauthorizedError } from "../../errors/customErrors";
import Post from "../../models/post";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";
//import axiosInstance from "../../services/customAxiosClient/customAxiosClient";
import IPostRepository from "./IpostRepository";

export default class PostRepository implements IPostRepository {
    private axios: ICustomAxiosClient;

    constructor() {
        this.axios = new CustomAxiosClient();
    }
    async addLike(postId: string): Promise<void> {
        const data = {
            postId: postId,
        };
        const response = await this.axios.instance.post<Post[]>("/Post/AddLikeToPost", data);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }
    }

    async getPostComments(postId: string): Promise<Post[]> {
        const response = await this.axios.instance.get<Post[]>("/Comments/ByPost/" + postId);

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
        const response = await this.axios.instance.get<Post[]>("/Post/GetFeedPosts");
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
        const response = await this.axios.instance.post("/Comments/Add", data);

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

    async getPostById(postId: string) {
        const response = await this.axios.instance.get<Post>("/Post/GetPostById/" + postId);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }

        return response.data;
    }
}
