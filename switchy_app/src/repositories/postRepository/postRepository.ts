import { InternalServerError, NetworkError, UnauthorizedError } from "../../errors/customErrors";
import Post from "../../models/post";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";
import IPostRepository from "./IpostRepository";

export default class PostRepository implements IPostRepository {
    private axios: ICustomAxiosClient;

    constructor() {
        this.axios = new CustomAxiosClient();
    }
    async addLike(postId: string, value: boolean): Promise<void> {
        const data = {
            postId: postId,
            value: value,
        };
        const response = await this.axios.instance.put<Post[]>("/Post/Like", data);

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

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new Error();
        }

        const aux = response.data.map((e) => {
            const aux = new Date(e.publishDate);
            e.publishDate = aux;
            return e;
        });

        return aux;
    }
    async getFeedPosts() {
        const response = await this.axios.instance.get<Post[]>("/Post/GetFeedPosts");

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new Error();
        }

        const aux = response.data.map((e) => {
            const aux = new Date(e.publishDate);
            e.publishDate = aux;
            return e;
        });

        return aux;
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
        response.data.publishDate = new Date(response.data.publishDate);

        return response.data;
    }
}
