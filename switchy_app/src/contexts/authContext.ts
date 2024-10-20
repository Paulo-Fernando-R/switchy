import { useContext, createContext } from "react";
import Auth from "../models/auth";

export type AuthContextContent = {
    auth: Auth | null;
    setAuth: (value: Auth) => void;
};

export const AuthContext = createContext<AuthContextContent>({
    auth: null,
    setAuth: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
