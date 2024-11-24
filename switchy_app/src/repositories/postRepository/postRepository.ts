import { BadRequestError, InternalServerError, NetworkError, NotFoundError, UnauthorizedError } from "../../errors/customErrors";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";
import IPostRepository from "./IpostRepository";
import Post from "../../models/post";

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
    async getFeedPosts(page: number) {
        const response = await this.axios.instance.get<Post[]>("/Post/Feed/" + page);

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

    async newPost(content: string) {
        const data = {
            content: content,
        };

        const response = await this.axios.instance.post("/Post/Create", data);

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
        const response = await this.axios.instance.get<Post>("/Post/ById/" + postId);

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

    async getUserPosts(userId: string, page: number) {
        const response = await this.axios.instance.get<Post[]>("/Post/ByUserId/" + userId + "/" + page);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }

        const list = response.data.map((e) => {
            e.publishDate = new Date(e.publishDate);
            return e;
        });

        return list;
    }

    async deletePost(postId: string) {
        const response = await this.axios.instance.delete("/Post/" + postId);
        console.log(response.status, postId);
        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }
    }
}
