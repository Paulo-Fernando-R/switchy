import React, { useState } from "react";
import styles from "./inputDefaultStyles";
import { View, TextInput } from "react-native";
import appColors from "../../styles/appColors";
import Feather from "@expo/vector-icons/Feather";

type InputDefaultProps = {
    placeholder: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    password?: boolean | undefined;
    multiline?: boolean | undefined;
};

type IconProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InputDefault({ placeholder, setText, text, password, multiline }: InputDefaultProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.inputBox}>
            <TextInput
                value={text}
                onChangeText={setText}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={appColors.text300}
                secureTextEntry={password ? !visible : false}
                multiline={multiline}
            />
            {password ? <Icon setVisible={setVisible} visible={visible} /> : null}
        </View>
    );
}

function Icon({ visible, setVisible }: IconProps) {
    function handleVisible() {
        setVisible(!visible);
    }
    if (visible) {
        return <Feather name="eye-off" size={20} color={appColors.text300} onPress={handleVisible} />;
    }

    return <Feather name="eye" size={20} color={appColors.text300} onPress={handleVisible} />;
}
