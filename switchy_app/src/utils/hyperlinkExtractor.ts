export default class HyperlinkExtractor {
    static extractUrl(text: string | undefined) {
        if (!text) return null;
        const regex = /\b(?:https?:\/\/|www\.)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s]*)?\b/g;

        const res = text.match(regex);

        return res;
    }
}
