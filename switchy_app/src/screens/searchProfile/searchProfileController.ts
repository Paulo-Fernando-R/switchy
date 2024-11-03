import User from "../../models/user";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";

export default class SearchProfileController {
    private repository: IPostRepository;
    private userRepository: IUserRepository;
    placeholderData: { posts: any[]; userData: User  };
    constructor() {
        this.repository = new PostRepository();
        this.userRepository = new UserRepository();
        this.placeholderData = {
            posts: [null, null, null, null, null, null, null, null],
            userData: { name: ".........", userName: ".........", followers: [], email: "........." },
        };
    }
    async getPosts(userId: string) {
        const posts = await this.repository.getUserPosts(userId);

        return posts.sort((a, b) => (a.publishDate.getTime() < b.publishDate.getTime() ? 1 : -1));
    }

    async getUserData(userId: string) {
        return await this.userRepository.getUserById(userId);
    }

    async getScreenData(userId: string) {
        const posts = await this.getPosts(userId);
        const userData = await this.getUserData(userId);
        return { posts, userData };
    }
}
