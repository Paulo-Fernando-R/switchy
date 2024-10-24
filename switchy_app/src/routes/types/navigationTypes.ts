import type { StackNavigationProp } from "@react-navigation/stack";
import type { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Post from "../../models/post";

//!HOME
export type HomeStackParamList = {
    Home: undefined;
    Comments: {
        post: Post;
    };
};

export type HomeNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;
export type HomeRouteProp = RouteProp<HomeStackParamList, "Home">;
export type CommentsRouteProp = RouteProp<HomeStackParamList, "Comments">;

//!SEARCH
export type SearchStackParamList = {
    Search: undefined;
    SearchProfile: {
        userId: string;
    };
};

export type SearchNavigationProp = StackNavigationProp<SearchStackParamList, "Search">;
export type SearchRouteProp = RouteProp<SearchStackParamList, "Search">;
export type SearchProfileRouteProp = RouteProp<SearchStackParamList, "SearchProfile">;

//!ROOT
export type RootTabsParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    SearchStack: NavigatorScreenParams<SearchStackParamList>;
    Publish: undefined;
    User: undefined;
};

//!HOME TAB NAV
export type RootTabsHomeNavigationProp = BottomTabScreenProps<RootTabsParamList, "HomeStack">;
export type RootTabsHomeRouteProp = RouteProp<RootTabsParamList, "HomeStack">;

//!SEARCH TAB NAV
export type RootTabsSearchNavigationProp = BottomTabScreenProps<RootTabsParamList, "SearchStack">;
export type RootTabsSearchRouteProp = RouteProp<RootTabsParamList, "SearchStack">;
