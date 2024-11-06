import styles from "../userEditStyles";
import { useForm, Controller, useFormState } from "react-hook-form";
import React from "react";
import InputDefault from "../../../components/inputDefault/InputDefault";
import { View, Text } from "react-native";
import ButtonLarge from "../../../components/buttonLarge/ButtonLarge";
import appColors from "../../../styles/appColors";
import UserEditController from "../userEditController";
import { useMutation } from "@tanstack/react-query";
import SnackBar from "../../../components/snackBar/SnackBar";

export type PasswordFormData = {
    password: string;
    newPassword: string;
};

export default function Password() {
    const controller = new UserEditController();

    const [snackError, setSnackError] = React.useState(false);
    const [snackSuccess, setSnackSuccess] = React.useState(false);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<PasswordFormData>();

    const { isValid } = useFormState({ control });

    const onSubmit = handleSubmit(async (data) => {
        await controller.changePassword(data.password, data.newPassword, reset, isValid);
    });

    const mutation = useMutation({
        mutationFn: () => onSubmit(),
        onError: () => {
            setSnackError(true);
        },
        onSuccess: () => {
            Object.keys(errors).length === 0 && setSnackSuccess(true);
        },
    });

    return (
        <View style={styles.form}>
            <SnackBar.Error
                message={mutation.error?.message ?? "Erro ao atualizar dados pessoais"}
                setVisible={setSnackError}
                visible={snackError}
                autoDismissible={true}
            />
            <SnackBar.Sucess
                message={"Dados pessoais atualizados com sucesso"}
                setVisible={setSnackSuccess}
                visible={snackSuccess}
                autoDismissible={true}
            />
            <Text style={styles.formTitle}>Alterar senha</Text>
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
                action={mutation.mutate}
                title="Alterar senha"
                backColor={appColors.error}
                textColor={appColors.text100}
            />
        </View>
    );
}
