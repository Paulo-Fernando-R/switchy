import { LinkPreview } from "@flyerhq/react-native-link-preview";
import HyperlinkExtractor from "../../utils/hyperlinkExtractor";
//@ts-ignore
import twitter from "../../../assets/images/twitter.png";
import { TouchableWithoutFeedback } from "react-native";
import { webViewJsCode } from "./postwebViewScripts";
import RegularExp from "../../utils/regularExp";
import { View, Image } from "react-native";
import WebView from "react-native-webview";
import styles from "./postWebViewStyles";
import { Linking } from "react-native";
import React from "react";

type PostWebViewProps = {
    text: string | undefined;
};

type OptionsProps = {
    url: string;
};

export default function PostWebView({ text }: PostWebViewProps) {
    let url = HyperlinkExtractor.extractUrl(text);
    if (!url) return null;

    const domain = HyperlinkExtractor.extractDomain(url[0]) ?? "";

    if (RegularExp.instagram.test(domain)) return <Instagram url={url[0]} />;
    if (RegularExp.youtube.test(domain)) return <Youtube url={url[0]} />;
    if (RegularExp.twitter.test(domain)) return <Twitter url={url[0]} />;
    if (RegularExp.tiktok.test(domain)) return <TikTok url={url[0]} />;

    return <Default url={url[0]} />;
}

function Default({ url }: OptionsProps) {
    return (
        <View style={styles.defaultContainer}>
            <LinkPreview
                text={url}
                metadataContainerStyle={{ display: "none" }}
                metadataTextContainerStyle={{ display: "none" }}
                textContainerStyle={{ display: "none" }}
                renderText={() => null}
                renderDescription={() => null}
                renderHeader={() => null}
                renderTitle={() => null}
            />
        </View>
    );
}

function Instagram({ url }: OptionsProps) {
    return (
        <View style={styles.InstagraContainer}>
            <WebView
                source={{ uri: url }}
                style={styles.instagramWeb}
                injectedJavaScript={webViewJsCode}
                injectedJavaScriptBeforeContentLoaded={webViewJsCode}
                originWhitelist={["*"]}
                javaScriptEnabled={true}
                onMessage={() => {}}
                cacheEnabled={true}
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
                mixedContentMode="compatibility"
            />
        </View>
    );
}

function Youtube({ url }: OptionsProps) {
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

function Twitter({ url }: OptionsProps) {
    return (
        <View style={styles.twitterContainer}>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
                <Image style={{ width: "100%", height: "100%" }} source={twitter} />
            </TouchableWithoutFeedback>
        </View>
    );
}

function TikTok({ url }: OptionsProps) {
    const baseUrl = "https://www.tiktok.com/embed/v3/";
    const videId = HyperlinkExtractor.extractTiktokId(url);
    return (
        <View style={styles.tiktokContainer}>
            <WebView
                source={{ uri: baseUrl + videId }}
                style={styles.instagramWeb}
                cacheEnabled={true}
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
                mixedContentMode="compatibility"
            />
        </View>
    );
}
