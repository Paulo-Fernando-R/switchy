import IPostRepository from "../../repositories/postRepository/IpostRepository";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import UnFollowUserCase from "../../cases/unFollowUserCase/unFollowUserCase";
import IgetUserDataCase from "../../cases/getUserDataCase/IgetUserDataCase";
import IStorageService from "../../services/storageService/IstorageService";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import StorageService from "../../services/storageService/storageService";
import GetUserDataCase from "../../cases/getUserDataCase/getUserDataCase";
import IfollowUserCase from "../../cases/followUserCase/IfollowUsercase";
import FollowUserCase from "../../cases/followUserCase/followUserCase";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import User from "../../models/user";
import Post from "../../models/post";

export default class SearchProfileController {
    private repository: IPostRepository;
    private userRepository: IUserRepository;
    private followUserCase: IfollowUserCase;
    private storageService: IStorageService<User>;
    private getUserDataCase: IgetUserDataCase;
    private unFollowUserCase: UnFollowUserCase;
    placeholderData: { posts: any[]; userData: User };

    constructor() {
        this.repository = new PostRepository();
        this.userRepository = new UserRepository();
        this.followUserCase = new FollowUserCase();
        this.storageService = new StorageService(StorageTypeEnum.user);
        this.getUserDataCase = new GetUserDataCase();
        this.unFollowUserCase = new UnFollowUserCase();
        this.placeholderData = {
            posts: [null, null, null, null, null, null, null, null],
            userData: { name: ".........", userName: ".........", followers: [], email: "........." },
        };
    }

    async getScreenData(userId: string) {
        const posts = await this.getPosts(userId);
        const userData = await this.getUserData(userId);

        return { posts, userData };
    }
    
    async getPosts(userId: string) {
        const posts = await this.repository.getUserPosts(userId);

        return posts.sort((a, b) => (a.publishDate.getTime() < b.publishDate.getTime() ? 1 : -1));
    }

    async getUserData(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        return user;
    }

   

    isFollowing(followedId: string, loggedInUser: User | null) {
        if (!loggedInUser) {
            return false;
        }

        const res = loggedInUser.following?.some((value) => value.userId === followedId);
        return res;
    }

    async handleFollow(
        userId: string,
        setFollow: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        setUser: (user: User) => void,
        refetch: (options?: RefetchOptions) => Promise<
            QueryObserverResult<
                {
                    posts: Post[];
                    userData: User;
                },
                Error
            >
        >,
        follow: boolean | undefined
    ) {
        if (follow) {
            await this.unFollow(userId, setFollow, setUser, refetch);
        } else {
            await this.follow(userId, setFollow, setUser, refetch);
        }
    }

    async follow(
        userId: string,
        setFollow: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        setUser: (user: User) => void,
        refetch: (options?: RefetchOptions) => Promise<
            QueryObserverResult<
                {
                    posts: Post[];
                    userData: User;
                },
                Error
            >
        >
    ) {
        await this.followUserCase.execute(userId);
        setFollow(true);
        const newUser = await this.getUserDataCase.execute();
        setUser(newUser);
        this.updateStorage(newUser);
        refetch();
    }

    async unFollow(
        userId: string,
        setFollow: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        setUser: (user: User) => void,
        refetch: (options?: RefetchOptions) => Promise<
            QueryObserverResult<
                {
                    posts: Post[];
                    userData: User;
                },
                Error
            >
        >
    ) {
        await this.unFollowUserCase.execute(userId);
        setFollow(false);
        const newUser = await this.getUserDataCase.execute();
        setUser(newUser);
        this.updateStorage(newUser);
        refetch();
    }

    updateStorage(user: User) {
        this.storageService.setItem(user);
    }
}
