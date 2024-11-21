import Preview from "../../models/preview";
import HyperlinkExtractor from "../../utils/hyperlinkExtractor";
//@ts-ignore
import twitter from "../../../assets/images/twitter.png";
import { TouchableWithoutFeedback } from "react-native";
import { webViewJsCode } from "./postwebViewScripts";
import RegularExp from "../../utils/regularExp";
import { View, Image, Text } from "react-native";
import WebView from "react-native-webview";
import styles from "./postWebViewStyles";
import { Linking } from "react-native";
import React from "react";
import { getLinkPreview } from "link-preview-js";
import { useQuery } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
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

    const query = useQuery({
        queryKey: ["linkPreview", url],
        queryFn: () => controller.getPostPreview(url[0]),
    });

    const domain = HyperlinkExtractor.extractDomain(url[0]) ?? "";

    // async function fetchData(url: string): Promise<Preview> {
    //     try {
    //         const data = await getLinkPreview(url);
    //         if (!data) throw new Error("Erro ao obter preview da URL");
    //         return data as Preview;
    //     } catch (error) {
    //         console.error("Erro ao obter preview da URL:", error);
    //         throw error;
    //     }
    // }

    if (query.error) return null;
    console.log(query.data);

    // function getIcon() {
    //     if (query.data?.images) if (query.data.images.length > 0) return query.data.images[0];

    //     if (query.data?.favicons) if (query.data.favicons.length > 0) return query.data.favicons[0];

    //     return "https://placehold.co/600x400/2B2B3D/white/png?text=No+data+preview";
    // }

    if (RegularExp.instagram.test(domain))
        return (
            <>
                <Instagram url={url[0]} />
                <CardTitle url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />
            </>
        );
    if (RegularExp.youtube.test(domain)) return <Youtube url={url[0]} />;
    if (RegularExp.twitter.test(domain))
        return <CardTitle url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;
    if (RegularExp.tiktok.test(domain))
        return <CardTitle url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;
    if (RegularExp.image.test(domain)) return <ImagePreview url={url[0]} img={url[0]} />;

    return <CardTitle url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;
}

function ImagePreview({ url }: OptionsProps) {
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
//   const baseUrl = 'https://vm.tiktok.com/embed/v3/?videoId='
function TikTok({ url }: OptionsProps) {
    const baseUrl = "https://www.tiktok.com/oembed?url=";
    // const baseUrl = 'https://vm.tiktok.com/embed/v3/?videoId='
    const videId = HyperlinkExtractor.extractTiktokId(url);

    const query = useQuery({
        queryKey: ["tiktok", videId],
        queryFn: () => fetch(baseUrl + url).then((res) => res.json()),
    });

    console.log(url);
    return (
        <View style={styles.tiktokContainer}>
            <WebView
                source={{ html: query.data?.html ?? "" }}
                style={styles.instagramWeb}
                cacheEnabled={true}
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
                mixedContentMode="compatibility"
            />
        </View>
    );
}
