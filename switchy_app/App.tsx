import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TabBarContext } from "./src/contexts/tabBarContext";
import br from "javascript-time-ago/locale/pt.json";
import appColors from "./src/styles/appColors";
import { StatusBar } from "expo-status-bar";
import "./src/routes/gestureHandlerNative";
import Router from "./src/routes/Router";
import TimeAgo from "javascript-time-ago";

import { useState } from "react";

export default function App() {
    TimeAgo.addDefaultLocale(br);
    const [tabBarVisible, setTabBarVisible] = useState(true);
    const changeState = (isVisible: boolean) => setTabBarVisible(isVisible);
    return (
        <QueryClientProvider client={new QueryClient()}>
            <TabBarContext.Provider value={{ tabBarVisible: tabBarVisible, setTabBarVisible: changeState }}>
                <StatusBar backgroundColor={appColors.bg100} style="light" />
                <Router />
            </TabBarContext.Provider>
        </QueryClientProvider>
    );
}
