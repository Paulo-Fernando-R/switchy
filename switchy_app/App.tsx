import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import appColors from "./src/styles/appColors";
import { StatusBar } from "expo-status-bar";
import "./src/routes/gestureHandlerNative";
import Router from "./src/routes/Router";
import TimeAgo from "javascript-time-ago";
import br from "javascript-time-ago/locale/pt.json";

export default function App() {
    TimeAgo.addDefaultLocale(br);
    return (
        <QueryClientProvider client={new QueryClient()}>
            <StatusBar backgroundColor={appColors.bg100} style="light" />
            <Router />
        </QueryClientProvider>
    );
}
