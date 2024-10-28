import styles from "../userEditStyles";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import InputDefault from "../../../components/inputDefault/InputDefault";
import { View } from "react-native";
import ButtonLarge from "../../../components/buttonLarge/ButtonLarge";
import appColors from "../../../styles/appColors";

type FormData = {
    name: string;
    userName: string;
    email: string;
    description: string;
};

export default function PersonalInfo() {
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
                    <InputDefault setText={onChange} text={value} placeholder="Nome" />
                )}
                name="name"
                //rules={{ required: true,  }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="Nome de usuário" />
                )}
                name="userName"
                //rules={{ required: true }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="E-mail" />
                )}
                name="email"
                //rules={{ required: true }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="Descrição" />
                )}
                name="description"
                //rules={{ required: true }}
            />
            <ButtonLarge
                action={onSubmit}
                title="Salvar"
                backColor={appColors.accent300}
                textColor={appColors.text100}
            />
        </View>
    );
}
