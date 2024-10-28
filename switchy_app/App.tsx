import "./src/routes/gestureHandlerNative";
import br from "javascript-time-ago/locale/pt.json";
import appColors from "./src/styles/appColors";
import { StatusBar } from "expo-status-bar";
import Router from "./src/routes/Router";
import TimeAgo from "javascript-time-ago";
import StorageService from "./src/services/storageService/storageService";
import { useState } from "react";
import Auth from "./src/models/auth";
import StorageTypeEnum from "./src/enums/storageTypeEnum";
import NestContext from "./src/contexts/NestContext";
import React from "react";
import User from "./src/models/user";

export default function App() {
    TimeAgo.addLocale(br);
    const authStorage = new StorageService<Auth>(StorageTypeEnum.auth);
    const userStorage = new StorageService<User>(StorageTypeEnum.user);
    //authStorage.removeItem()
    const storedAuth = authStorage.getItem();
    const storedUser = userStorage.getItem();

    const [tabBarVisible, setTabBarVisible] = useState(true);
    const [auth, setAuth] = useState<Auth | null>(storedAuth);
    const [user, setUser] = useState<User | null>(storedUser);
    const changeState = (isVisible: boolean) => setTabBarVisible(isVisible);
    const changeAuth = (auth: Auth) => setAuth(auth);
    const changeUser = (user: User) => setUser(user);

    return (
        <NestContext
            auth={auth}
            changeAuth={changeAuth}
            changeState={changeState}
            tabBarVisible={tabBarVisible}
            changeUser={changeUser}
            user={user}
        >
            <StatusBar backgroundColor={appColors.bg100} style="light" />
            <Router />
        </NestContext>
    );
}
