import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TabBarContext } from "./src/contexts/tabBarContext";
import { AuthContext } from "./src/contexts/authContext";
import br from "javascript-time-ago/locale/pt.json";
import appColors from "./src/styles/appColors";
import { StatusBar } from "expo-status-bar";
import "./src/routes/gestureHandlerNative";
import Router from "./src/routes/Router";
import TimeAgo from "javascript-time-ago";
import StorageService from "./src/services/storageService/storageService";
import { useState } from "react";
import Auth from "./src/models/auth";
import StorageTypeEnum from "./src/enums/storageTypeEnum";
import { Host } from "react-native-portalize";

export default function App() {
    TimeAgo.addLocale(br);
    const storage = new StorageService<Auth>(StorageTypeEnum.auth);
    //storage.removeItem()
    const stored = storage.getItem();

    const [tabBarVisible, setTabBarVisible] = useState(true);
    const [auth, setAuth] = useState<Auth | null>(stored);
    const changeState = (isVisible: boolean) => setTabBarVisible(isVisible);
    const changeAuth = (auth: Auth) => setAuth(auth);
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthContext.Provider value={{ auth: auth, setAuth: changeAuth }}>
                <TabBarContext.Provider value={{ tabBarVisible: tabBarVisible, setTabBarVisible: changeState }}>
                    <StatusBar backgroundColor={appColors.bg100} style="light" />
                    <Host>
                        <Router />
                    </Host>
                </TabBarContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}
