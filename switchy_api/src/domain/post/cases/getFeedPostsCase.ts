import { Types } from "mongoose";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { UnableGetPostError } from "../errors/postErrors";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";

export default class GetFeedPostsCase {
    private readonly postRepository: IPostRepository;
    private readonly userRepository: IUserRepository;
    constructor(_postRepository: IPostRepository, _userRepository: IUserRepository) {
        this.postRepository = _postRepository;
        this.userRepository = _userRepository;
    }

    async execute(userId: string, page: number) {
        try {
            const user = await this.userRepository.getById(userId);
            const followings = user?.following;

            if (!followings || followings.length == 0) {
                return await this.postRepository.getFeedPosts(userId, page);
            }

            const ids = followings.map((e) => new Types.ObjectId(e.userId));

            const response = await this.postRepository.getFeedPosts(userId, page, ids);

            return response;
        } catch (error) {
            console.error(error);
            throw new UnableGetPostError();
        }
    }
}
