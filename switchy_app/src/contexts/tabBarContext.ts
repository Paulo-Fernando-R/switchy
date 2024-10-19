import { useContext } from "react";
import { createContext } from "react";

export type TabBarContextContent = {
    tabBarVisible: boolean;
    setTabBarVisible: (visible: boolean) => void;
};

export const TabBarContext = createContext<TabBarContextContent>({
    tabBarVisible: true,
    setTabBarVisible: () => {},
});

export const useTabBarContext = () => useContext(TabBarContext);
