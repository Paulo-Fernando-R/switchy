import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import appColors from "./src/styles/appColors";

export default function App() {
    return (
        <View>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar backgroundColor={appColors.bg100} style="light" />
        </View>
    );
}
