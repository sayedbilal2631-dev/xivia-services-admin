import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { CustomButton, CustomTextField, PasswordCriteriaList } from "components";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";
import { COLORS } from "constant/color";
import { useToast } from "context";
import { useState } from "react";
import { auth } from "libs";

interface PasswordForm {
    CurrentPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}

const PasswordTab = () => {
    const methods = useForm<PasswordForm>();

    const newPassword = useWatch({
        control: methods.control,
        name: "NewPassword",
        defaultValue: "",
    });

    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: PasswordForm) => {
        const { CurrentPassword, NewPassword, ConfirmPassword } = data;

        if (NewPassword !== ConfirmPassword) {
            showToast("New passwords do not match", "error");
            return;
        }

        try {
            const currentUser = auth.currentUser;

            if (!currentUser || !currentUser.email) {
                showToast("User not authenticated", "error");
                return;
            }

            setLoading(true);

            const credential = EmailAuthProvider.credential(
                currentUser.email,
                CurrentPassword
            );

            await reauthenticateWithCredential(currentUser, credential);

            await updatePassword(currentUser, NewPassword);

            showToast("Password updated successfully", "success");
            methods.reset();
        } catch (error: any) {
            showToast(error.message || "Failed to update password", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: "440px", mx: "auto", gap: "30px" }}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Typography sx={{ fontWeight: 500, color: COLORS.gray.main, mb: 2 }}>
                        * If you require a new login to CollabMind Admin panel, please update the password below.
                    </Typography>

                    <Stack spacing={2}>
                        <CustomTextField
                            name="CurrentPassword"
                            label="Current password"
                            type="password"
                            placeholder="Current Password"
                            width="100%"
                        />

                        <CustomTextField
                            name="NewPassword"
                            label="New password"
                            type="password"
                            placeholder="New Password"
                            width="100%"
                        />

                        <CustomTextField
                            name="ConfirmPassword"
                            label="Confirm password"
                            type="password"
                            placeholder="Confirm Password"
                            width="100%"
                        />
                    </Stack>

                    <PasswordCriteriaList password={newPassword} />

                    <CustomButton
                        title={loading ? "Updating..." : "Update"}
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={loading}
                    />
                </form>
            </FormProvider>
        </Box>
    );
};

export default PasswordTab;
