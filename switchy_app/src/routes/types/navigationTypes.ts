import type { StackNavigationProp } from "@react-navigation/stack";
import type { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Post from "../../models/post";

//!AUTH

export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Recovery: undefined;
};

export type AuthNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

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
    Comments: {
        post: Post;
    };
};

export type SearchNavigationProp = StackNavigationProp<SearchStackParamList, "Search">;
export type SearchRouteProp = RouteProp<SearchStackParamList, "Search">;
export type SearchProfileRouteProp = RouteProp<SearchStackParamList, "SearchProfile">;
export type SearchCommentsRouteProp = RouteProp<SearchStackParamList, "Comments">;

//!PROFILE
export type ProfileStackParamList = {
    Profile: undefined;
    ProfileEdit: undefined;
    Comments: {
        post: Post;
    };
};

export type ProfileNavigationProp = StackNavigationProp<ProfileStackParamList, "Profile">;
export type ProfileRouteProp = RouteProp<ProfileStackParamList, "Profile">;
export type ProfileEditRouteProp = RouteProp<ProfileStackParamList, "ProfileEdit">;
export type ProfileCommentsRouteProp = RouteProp<ProfileStackParamList, "Comments">;

//!ROOT
export type RootTabsParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
    SearchStack: NavigatorScreenParams<SearchStackParamList>;
    Publish: undefined;
    ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

//!HOME TAB NAV
export type RootTabsHomeNavigationProp = BottomTabScreenProps<RootTabsParamList, "HomeStack">;
export type RootTabsHomeRouteProp = RouteProp<RootTabsParamList, "HomeStack">;

//!SEARCH TAB NAV
export type RootTabsSearchNavigationProp = BottomTabScreenProps<RootTabsParamList, "SearchStack">;
export type RootTabsSearchRouteProp = RouteProp<RootTabsParamList, "SearchStack">;

//!PUBLISH TAB NAV
export type RootTabsPublishNavigationProp = BottomTabScreenProps<RootTabsParamList, "Publish">;
export type RootTabsPublishRouteProp = RouteProp<RootTabsParamList, "Publish">;

//!Profile TAB NAV
export type RootTabsProfileNavigationProp = BottomTabScreenProps<RootTabsParamList, "ProfileStack">;
export type RootTabsProfileRouteProp = RouteProp<RootTabsParamList, "ProfileStack">;
