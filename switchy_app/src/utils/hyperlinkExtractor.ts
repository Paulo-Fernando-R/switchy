export default class HyperlinkExtractor {
    static extractUrl(text: string | undefined) {
        if (!text) return null;
        const regex = /\b(?:https?:\/\/|www\.)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s]*)?\b/g;

        const res = text.match(regex);

        return res;
    }

    static extractDomain(url: string | undefined) {
        if (!url) return null;
        const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
        const res = url.match(regex);
        if (!res) return null;
        // console.log(res, '|')
        return res[1];
    }

    static extractInstagramId(url: string | undefined) {
        if (!url) return null;
        const regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv|stories|[\w.]+)\/([\w-]+)\/?/;
        const res = url.match(regex);
        if (!res) return null;
        // console.log(res, '|')
        return res[1];
    }

    static extractYoutubeId(url: string | undefined) {
        if (!url) return null;
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const res = url.match(regex);
        if (!res) return null;
        // console.log(res, '|')
        return res[1];
    }

    static extractTiktokId(url: string | undefined) {
        if (!url) return null;
        const regex = /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/(?:.*\/video\/)?(\d+)/;
        const res = url.match(regex);
        if (!res) return null;
        // console.log(res, '|')
        return res[1];
    }
}
