import Preview from "../../models/preview";
import GetPostPreviewCase from "../getPostPreviewCase/getPostPreviewCase";
import IgetPostPreviewCase from "../getPostPreviewCase/IgetPostPreviewCase";

export default class PostWebViewController {
    private readonly getPostPreviewCase: IgetPostPreviewCase;
    constructor() {
        this.getPostPreviewCase = new GetPostPreviewCase();
    }

    async getPostPreview(url: string): Promise<Preview> {
        try {
            const response = await this.getPostPreviewCase.execute(url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    getIcon(data: Preview | undefined) {
        if (!data) return "https://placehold.co/600x400/2B2B3D/white/png?text=No+data+preview";

        if (data.images) if (data.images.length > 0) return data.images[0];

        if (data.favicons) if (data.favicons.length > 0) return data.favicons[0];

        return "https://placehold.co/600x400/2B2B3D/white/png?text=No+data+preview";
    }

    getText(data: Preview | undefined) {
        if (!data) return "No data preview";

        if (data.description) return data.description;

        if (data.title) return data.title;

        if(data.url) return data.url;

        return "No data preview";
    }
}
