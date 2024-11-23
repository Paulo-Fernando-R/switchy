import HyperlinkExtractor from "../../utils/hyperlinkExtractor";
import RegularExp from "../../utils/regularExp";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostWebViewController from "./postWebViewController";
import Instagram from "./privateComponents/Instagram";
import Youtube from "./privateComponents/YouTube";
import Twitter from "./privateComponents/Twitter";
import ImagePreview from "./privateComponents/ImagePreview";
import Tiktok from "./privateComponents/Tiktok";
import CardTitle from "./privateComponents/CardTitle";

type PostWebViewProps = {
    text: string | undefined;
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
        return <Tiktok url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;

    if (RegularExp.image.test(url[0])) return <ImagePreview url={url[0]} img={url[0]} />;

    return <CardTitle url={url[0]} img={controller.getIcon(query.data)} text={controller.getText(query.data)} />;
}

// function TikTok({ url, img, text }: OptionsProps) {
//     return (
//         <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
//             <View style={styles.twitterContainer}>
//                 <Image source={{ uri: img! }} style={styles.twitterImg} />
//                 <Text numberOfLines={3} style={styles.twitterText}>
//                     {text}
//                 </Text>
//             </View>
//         </TouchableWithoutFeedback>
//     );
// }

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
