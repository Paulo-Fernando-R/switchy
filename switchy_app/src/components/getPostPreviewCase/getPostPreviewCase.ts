import PostPreviewService from "../../services/postPreviewService/postPreviewService";
import IpostPreviewService from "../../services/postPreviewService/IpostPreviewService";
import IgetPostPreviewCase from "./IgetPostPreviewCase";

export default class GetPostPreviewCase implements IgetPostPreviewCase {
    private readonly postPreviewService: IpostPreviewService;
    constructor() {
        this.postPreviewService = new PostPreviewService();
    }
    execute(url: string) {
        return this.postPreviewService.getPostPreview(url);
    }
}
