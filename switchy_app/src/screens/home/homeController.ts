import PostRepository from "../../repositories/postRepository/postRepository";

export default class HomeController{
    private readonly repository:PostRepository
    constructor() {
        this.repository = new PostRepository();
    }

    async getFeedData(){
        return await this.repository.getFeedPosts()
    }
}