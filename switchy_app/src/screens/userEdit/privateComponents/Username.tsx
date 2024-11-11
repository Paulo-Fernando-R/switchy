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
import { useUserContext } from "../../../contexts/userContext";

export type UsernameFormData = {
    userName: string;
};

export default function Username() {
    const controller = new UserEditController();
    const { user, setUser } = useUserContext();
    const [snackError, setSnackError] = React.useState(false);
    const [snackSuccess, setSnackSuccess] = React.useState(false);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<UsernameFormData>({
        defaultValues: {
            userName: user?.userName!,
        },

        shouldFocusError: true,
    });

    const { isValid } = useFormState({ control });

    const onSubmit = handleSubmit(async (data) => {
        const aux = user!;
        aux.userName = data.userName;
        await controller.changeUsername(aux, reset, isValid, setUser);
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
                message={mutation.error?.message ?? "Erro ao atualizar nome de usuário"}
                setVisible={setSnackError}
                visible={snackError}
                autoDismissible={true}
            />
            <SnackBar.Sucess
                message={"Nome de usuário atualizado com sucesso"}
                setVisible={setSnackSuccess}
                visible={snackSuccess}
                autoDismissible={true}
            />
            <Text style={styles.formTitle}>Nome de usuário</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="Nome de usuário" />
                )}
                name="userName"
                rules={{ required: true, minLength: 3, maxLength: 16 }}
            />

            <ButtonLarge
                action={mutation.mutate}
                title="Alterar nome de usuário"
                backColor={appColors.accent300}
                textColor={appColors.text100}
                disabled={mutation.isPending}
            />
        </View>
    );
}
