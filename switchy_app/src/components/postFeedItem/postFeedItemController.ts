import { IHandles } from "react-native-modalize/lib/options";
import { CustomError } from "../../errors/customErrors";
import Post from "../../models/post";
import User from "../../models/user";
import IPostRepository from "../../repositories/postRepository/IpostRepository";
import PostRepository from "../../repositories/postRepository/postRepository";

export default class PostFeedItemController {
    private readonly repository: IPostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async putLike(postId: string, value: boolean) {
        await this.repository.addLike(postId, value);
    }

    async getById(postId: string) {
        return await this.repository.getPostById(postId);
    }

    // getInitialLike(item: Post | undefined, user: User | null) {
    //     const likes = item?.likes;
    //     const id = user?.id;

    //     if (likes?.some((value) => value.userId === id)) {
    //         return true;
    //     }
    //     return false;
    // }

    async handleLike(
        postId: string,
        setLiked: React.Dispatch<React.SetStateAction<boolean>>,
        liked: boolean,
        updateOne: (post: Post) => void
    ) {
        try {
            await this.putLike(postId, liked);
            const response = await this.getById(postId);
            updateOne(response);
            setLiked(liked);
            return response;
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw error;
        }
    }

    openmModal(modalizeRef: React.RefObject<IHandles>) {
        modalizeRef.current?.open();
    }
}
