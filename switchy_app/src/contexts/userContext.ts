import { useContext, createContext } from "react";
import User from "../models/user";

export type UserContextContent = {
    user: User | null;
    setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextContent>({
    user: null,
    setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
