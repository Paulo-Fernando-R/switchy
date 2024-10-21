import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TabBarContext } from "./tabBarContext";
import { AuthContext } from "./authContext";
import { Host } from "react-native-portalize";
import Auth from "../models/auth";

type NestContextProps = {
    children: React.ReactNode[];

    tabBarVisible: boolean;
    auth: Auth | null;
    changeState: (isVisible: boolean) => void;
    changeAuth: (auth: Auth) => void;
};

export default function NestContext({ children, auth, changeAuth, changeState, tabBarVisible }: NestContextProps) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthContext.Provider value={{ auth: auth, setAuth: changeAuth }}>
                <TabBarContext.Provider value={{ tabBarVisible: tabBarVisible, setTabBarVisible: changeState }}>
                    <Host>{children}</Host>
                </TabBarContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}
