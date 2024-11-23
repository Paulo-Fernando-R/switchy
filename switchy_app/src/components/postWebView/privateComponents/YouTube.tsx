import { View } from "react-native";
import HyperlinkExtractor from "../../../utils/hyperlinkExtractor";
import styles from "../postWebViewStyles";
import WebView from "react-native-webview";

type YouTubeProps = {
    url: string;
};

export default function Youtube({ url }: YouTubeProps) {
    const baseUrl = "https://www.youtube.com/embed/";
    const videoId = HyperlinkExtractor.extractYoutubeId(url);

    return (
        <View style={styles.youtubeContainer}>
            <WebView
                source={{ uri: baseUrl + videoId }}
                style={styles.youtubeWeb}
                onMessage={() => {}}
                mixedContentMode="compatibility"
                allowsFullscreenVideo={true}
            />
        </View>
    );
}
