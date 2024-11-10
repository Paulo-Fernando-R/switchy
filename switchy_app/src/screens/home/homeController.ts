import GetUserDataCase from "../../cases/getUserDataCase/getUserDataCase";
import IgetUserDataCase from "../../cases/getUserDataCase/IgetUserDataCase";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import Post from "../../models/post";
import User from "../../models/user";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";

export default class HomeController {
    private readonly repository: IPostRepository;
    private readonly getUserDataCase: IgetUserDataCase;
    private readonly storageService: IStorageService<User>;
    placeholderData: any[];
    constructor() {
        this.repository = new PostRepository();
        this.getUserDataCase = new GetUserDataCase();
        this.placeholderData = [null, null, null, null, null, null, null, null];
        this.storageService = new StorageService<User>(StorageTypeEnum.user);
    }

    async getFeedData(pageParam: number) {
        return await this.repository.getFeedPosts(pageParam);
    }

    async getAppData(pageParam: number) {
        const response = await this.getFeedData(pageParam);
        await this.getUserData();
        return response.sort((a, b) => (a.publishDate.getTime() < b.publishDate.getTime() ? 1 : -1));
    }

    async getUserData() {
        const user = await this.getUserDataCase.execute();
        this.storageService.setItem(user);
    }

    handleNext(lastPage: Post[], pages: Post[][], lastPageParam: number) {
        if (lastPage.length < 10) {
            return;
        }
        return lastPageParam + 1;
    }
}
