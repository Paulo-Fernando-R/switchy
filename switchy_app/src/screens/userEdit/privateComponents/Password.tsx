import styles from "../userEditStyles";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import InputDefault from "../../../components/inputDefault/InputDefault";
import { View } from "react-native";
import ButtonLarge from "../../../components/buttonLarge/ButtonLarge";
import appColors from "../../../styles/appColors";

type FormData = {
    password: string;
    newPassword: string;
};

export default function Password() {
    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <View style={styles.form}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="Senha atual" />
                )}
                name="password"
                rules={{ required: true, minLength: 6, maxLength: 16 }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="Senha nova" />
                )}
                name="newPassword"
                rules={{ required: true, minLength: 6, maxLength: 16 }}
            />

            <ButtonLarge
                action={onSubmit}
                title="Alterar senha"
                backColor={appColors.error}
                textColor={appColors.text100}
            />
        </View>
    );
}
