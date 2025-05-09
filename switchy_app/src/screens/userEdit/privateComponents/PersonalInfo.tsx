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

export type UserInfoFormData = {
    name: string;
    email: string;
    description: string;
};

export default function PersonalInfo() {
    const controller = new UserEditController();
    const { user, setUser } = useUserContext();
    const [snackError, setSnackError] = React.useState(false);
    const [snackSuccess, setSnackSuccess] = React.useState(false);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<UserInfoFormData>({
        defaultValues: {
            name: user?.name!,
            email: user?.email!,
            description: user?.description!,
        },

        shouldFocusError: true,
    });

    const { isValid } = useFormState({ control });

    const onSubmit = handleSubmit(async (data) => {
        await controller.updateUserInfo(
            {
                name: data.name,
                email: data.email,
                userName: "",
                description: data.description,
            },
            reset,
            isValid,
            setUser
        );
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
            <Text style={styles.formTitle}>Atualizar dados pessoais</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="Nome" />
                )}
                name="name"
                rules={{ required: false, maxLength: 64, minLength: 2 }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault setText={onChange} text={value} placeholder="E-mail" />
                )}
                name="email"
                rules={{ required: false, maxLength: 64, minLength: 3 }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputDefault multiline={true} setText={onChange} text={value} placeholder="Descrição" />
                )}
                name="description"
                rules={{ required: false, maxLength: 64, minLength: 4 }}
            />
            <ButtonLarge
                action={mutation.mutate}
                title="Salvar"
                backColor={appColors.accent300}
                textColor={appColors.text100}
                disabled={mutation.isPending}
            />
        </View>
    );
}
