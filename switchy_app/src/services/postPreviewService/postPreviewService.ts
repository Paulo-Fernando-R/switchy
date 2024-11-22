import { getLinkPreview } from "link-preview-js";
import Preview from "../../models/preview";
import IpostPreviewService from "./IpostPreviewService";
export default class PostPreviewService implements IpostPreviewService {
    constructor() {}

    async getPostPreview(url: string): Promise<Preview> {
        try {
            const data = await getLinkPreview(url);
            if (!data) throw new Error("Erro ao obter preview da URL");
            return data as Preview;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
