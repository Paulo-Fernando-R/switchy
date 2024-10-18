import Post from "../../models/post";
import axiosInstance from "../../services/customAxiosClient/customAxiosClient";

export default class PostRepository {
    async getFeedPosts() {
        const response = await axiosInstance.get<Post[]>("/GetFeedPosts");
        response.data.map((e) => {
            const aux = new Date(e.publishDate);
            e.publishDate = aux;
            return e;
        });

        if (response.status === 200) return response.data;
        else throw new Error("Failed to get feed posts");
    }
}
