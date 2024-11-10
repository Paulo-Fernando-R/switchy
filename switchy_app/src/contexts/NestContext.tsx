import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TabBarContext } from "./tabBarContext";
import { AuthContext } from "./authContext";
import { Host } from "react-native-portalize";
import Auth from "../models/auth";
import { UserContext } from "./userContext";
import User from "../models/user";

type NestContextProps = {
    children: React.ReactNode[];
    tabBarVisible: boolean;
    auth: Auth | null;
    user: User | null;
    changeState: (isVisible: boolean) => void;
    changeAuth: (auth: Auth) => void;
    changeUser: (user: User) => void;
};

export default function NestContext({
    children,
    auth,
    user,
    changeAuth,
    changeState,
    tabBarVisible,
    changeUser,
}: NestContextProps) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthContext.Provider value={{ auth: auth, setAuth: changeAuth }}>
                <UserContext.Provider value={{ user: user, setUser: changeUser }}>
                    <TabBarContext.Provider value={{ tabBarVisible: tabBarVisible, setTabBarVisible: changeState }}>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <Host>{children}</Host>
                        </GestureHandlerRootView>
                    </TabBarContext.Provider>
                </UserContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}
