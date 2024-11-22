import { Linking, TouchableWithoutFeedback, View } from "react-native";
import styles from "../postWebViewStyles";
import WebView from "react-native-webview";
import { webViewJsCode } from "../postwebViewScripts";

type InstagramProps = {
    url: string;
};

export default function Instagram({ url }: InstagramProps) {
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
