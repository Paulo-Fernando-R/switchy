import type { StackNavigationProp } from "@react-navigation/stack";
import type { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Post from "../../models/post";

export type HomeStackParamList = {
    Home: undefined;
    Comments: {
        post: Post
    };
};

export type HomeNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;
export type HomeRouteProp = RouteProp<HomeStackParamList, "Home">;
export type CommentsRouteProp = RouteProp<HomeStackParamList, "Comments">;

//!ROOT

export type RootTabsParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    Search: undefined;
    Publish: undefined;
    User: undefined;
};

export type RootTabsHomeNavigationProp = BottomTabScreenProps<RootTabsParamList, "HomeStack">;
export type RootTabsHomeRouteProp = RouteProp<RootTabsParamList, "HomeStack">;
