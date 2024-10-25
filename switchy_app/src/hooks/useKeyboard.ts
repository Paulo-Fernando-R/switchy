import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import KeyboardStateEnum from "../enums/keyboardStateEnum";

const useKeyboard = () => {
    const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStateEnum>(KeyboardStateEnum.hidden);
    useEffect(() => {
        const show = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(KeyboardStateEnum.show);
        });

        const hide = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(KeyboardStateEnum.hidden);
        });

        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    return keyboardStatus;
};

export default useKeyboard;
