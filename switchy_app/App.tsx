import "./src/routes/gestureHandlerNative";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import appColors from "./src/styles/appColors";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./src/routes/Router";

export default function App() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <StatusBar backgroundColor={appColors.bg100} style="light" />
            <Router />
        </QueryClientProvider>
    );
}
