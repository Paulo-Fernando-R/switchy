import { InfiniteData, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import DeletePostCase from "../../cases/deletePostCase/deletePostCase";
import IDeletePostCase from "../../cases/deletePostCase/IdeletePostCase";
import Post from "../../models/post";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import Auth from "../../models/auth";
import User from "../../models/user";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import DeleteAccountCase from "../../components/deleteAccountCase/deleteAccountCase";
import IDeleteAccountCase from "../../components/deleteAccountCase/IdeleteAccountCase";

export default class UserController {
    private repository: IPostRepository;
    private deletePostCase: IDeletePostCase;
    private userStorage: IStorageService<User>;
    private postStorage: IStorageService<Auth>;
    private deleteAccountCase: IDeleteAccountCase;
    placeholderData: any[];

    constructor() {
        this.repository = new PostRepository();
        this.placeholderData = [null, null, null, null, null, null, null, null];
        this.deletePostCase = new DeletePostCase();
        this.userStorage = new StorageService<User>(StorageTypeEnum.user);
        this.postStorage = new StorageService<Auth>(StorageTypeEnum.auth);
        this.deleteAccountCase = new DeleteAccountCase();
    }
    async getPosts(userId: string, pageParam: number) {
        const posts = await this.repository.getUserPosts(userId, pageParam);
        return posts;
    }

    handleNext(lastPage: Post[], pages: Post[][], lastPageParam: number) {
        if (lastPage.length < 10) {
            return;
        }
        return lastPageParam + 1;
    }

    async deletePost(
        postId: string | undefined,
        setPopup: React.Dispatch<React.SetStateAction<boolean>>,
        refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<InfiniteData<any[], unknown>, Error>>
    ) {
        if (!postId) return;

        try {
            await this.deletePostCase.execute(postId);

            refetch();
            setPopup(false);
        } catch (error) {
            throw error;
        }
    }

    async logout(setUser: (user: User) => void, setAuth: (value: Auth) => void) {
        try {
            await this.userStorage.removeItem();
            await this.postStorage.removeItem();
            setUser(null!);
            setAuth(null!);
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAccount(
        setUser: (user: User) => void,
        setAuth: (value: Auth) => void
    ) {
        try {
            await this.deleteAccountCase.execute();
            await this.logout(setUser, setAuth);
        } catch (error) {
            throw error;
        }
    }
}
