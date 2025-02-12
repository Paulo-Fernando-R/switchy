import { useContext, createContext } from "react";
import Notification from "../models/notification";
import { ListContextContent } from "./listContextContent";

export const NotificationListContext = createContext<ListContextContent<Notification>>({
    values: null,
    setValues: () => {},
    updateOne: () => {},
});

export const useNotificationsListContext = () => useContext(NotificationListContext);
