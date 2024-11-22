import Preview from "../../models/preview";

export default interface IpostPreviewService {
    getPostPreview(url: string): Promise<Preview>;
}
