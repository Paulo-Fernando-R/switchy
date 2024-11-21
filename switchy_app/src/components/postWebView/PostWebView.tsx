import HyperlinkExtractor from "../../utils/hyperlinkExtractor";
import { TouchableWithoutFeedback } from "react-native";
import { webViewJsCode } from "./postwebViewScripts";
import RegularExp from "../../utils/regularExp";
import { View, Image, Text } from "react-native";
import WebView from "react-native-webview";
import styles from "./postWebViewStyles";
import { Linking } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";
import PostWebViewController from "./postWebViewController";

type PostWebViewProps = {
    text: string | undefined;
};

type OptionsProps = {
    url: string;
    img?: string;
    text?: string;
};

export default function PostWebView({ text }: PostWebViewProps) {
    let url = HyperlinkExtractor.extractUrl(text);
    if (!url) return null;

    const controller = new PostWebViewController();

    const domain = HyperlinkExtractor.extractDomain(url[0]) ?? "";

    if (RegularExp.instagram.test(domain)) return <Instagram url={url[0]} />;
    if (RegularExp.youtube.test(domain)) return <Youtube url={url[0]} />;

    const query = useQuery({
        queryKey: ["linkPreview", url],
        queryFn: () => controller.getPostPreview(url[0]),
    });

    if (query.error) return null;

    if (RegularExp.twitter.test(domain))
        return <Twitter url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;

    if (RegularExp.tiktok.test(domain))
        return <TikTok url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;

    if (RegularExp.image.test(url[0])) return <ImagePreview url={url[0]} img={url[0]} />;

    return <CardTitle url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;
}

function ImagePreview({ url, img }: OptionsProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <Image source={{ uri: img! }} style={styles.imageContainer} />
        </TouchableWithoutFeedback>
    );
}

function CardTitle({ img, text, url }: OptionsProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                    padding: 12,
                    borderRadius: 24,
                    backgroundColor: appColors.bg200,
                    alignItems: "center",
                    height: 100,
                }}
            >
                <Image
                    source={{ uri: img! }}
                    style={{ height: "100%", width: "40%", objectFit: "cover", overflow: "hidden", borderRadius: 12 }}
                />
                <Text numberOfLines={3} style={{ flex: 1, color: appColors.text200, ...appTexts.paragraph3Regular }}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

function Instagram({ url }: OptionsProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
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
        </TouchableWithoutFeedback>
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

function Twitter({ url, img, text }: OptionsProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <View style={styles.twitterContainer}>
                <Image source={{ uri: img! }} style={styles.twitterImg} />
                <Text numberOfLines={3} style={styles.twitterText}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

function TikTok({ url, img, text }: OptionsProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <View style={styles.twitterContainer}>
                <Image source={{ uri: img! }} style={styles.twitterImg} />
                <Text numberOfLines={3} style={styles.twitterText}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

//   const baseUrl = 'https://vm.tiktok.com/embed/v3/?videoId='
// function TikTok({ url }: OptionsProps) {
//     const baseUrl = "https://www.tiktok.com/oembed?url=";
//     // const baseUrl = 'https://vm.tiktok.com/embed/v3/?videoId='
//     const videId = HyperlinkExtractor.extractTiktokId(url);

//     const query = useQuery({
//         queryKey: ["tiktok", videId],
//         queryFn: () => fetch(baseUrl + url).then((res) => res.json()),
//     });

//     console.log(url);
//     return (
//         <View style={styles.tiktokContainer}>
//             <WebView
//                 source={{ html: query.data?.html ?? "" }}
//                 style={styles.instagramWeb}
//                 cacheEnabled={true}
//                 cacheMode="LOAD_CACHE_ELSE_NETWORK"
//                 mixedContentMode="compatibility"
//             />
//         </View>
//     );
// }
