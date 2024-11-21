import PreviewTypeEnum from "../enums/previewTypeEnum";

export default interface Preview {
    url: string;
    title?: string;
    siteName?: string;
    description?: string;
    images?: string[];
    mediaType: PreviewTypeEnum;
    contentType: string;
    charset?: string;
    videos?: string[];
    favicons: string[];

    // constructor(obj: any) {
    //     if (obj) {
    //         this.url = obj.url ?? "";
    //         this.title = obj.title;
    //         this.siteName = obj.siteName;
    //         this.description = obj.description;
    //         this.images = obj.images;
    //         this.mediaType = obj.mediaType;
    //         this.contentType = obj.contentType;
    //         this.charset = obj.charset;
    //         this.videos = obj.videos;
    //         this.favicons = obj.favicons;
    //     } else {
    //         this.url = "";
    //         this.mediaType = PreviewTypeEnum.unknown;
    //         this.contentType = "";
    //         this.favicons = [];
    //     }
    // }
}
