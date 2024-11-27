import { View, Text, Image, Dimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import appTexts from "../../styles/appTexts";
import appColors from "../../styles/appColors";
import blank from "../../../assets/images/blank.png";

type EmptyListProps = { text?: string };

export default function EmptyList({ text }: EmptyListProps) {
    return (
        <View
            style={{
                flex: 1,
                height: Dimensions.get("window").height / 1.4,
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
            }}
        >
            <Image source={blank} style={{ width: 272, height: 281 }} />
            <Text
                style={{
                    ...appTexts.title2Medium,
                    color: appColors.accent100,
                    textAlign: "center",
                }}
            >
                {text ?? "Nenhuma publicação para ver no momento..."}
            </Text>
        </View>
    );
}
