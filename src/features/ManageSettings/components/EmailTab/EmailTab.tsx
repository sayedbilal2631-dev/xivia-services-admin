import { Box, Typography, CircularProgress } from "@mui/material";
import { CustomButton, CustomTextField } from "components";
import { COLORS } from "constant/color";
import { useAuth, useToast } from "context";
import { FormProvider, useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs";
import { useEffect, useState } from "react";

interface EmailForm {
    email: string;
}

const EmailTab = () => {
    const { user } = useAuth();
    const { showToast } = useToast();

    const [loading, setLoading] = useState(false);

    const methods = useForm<EmailForm>({
        defaultValues: { email: "" },
    });

    useEffect(() => {
        if (user?.email) {
            methods.setValue("email", user.email);
        }
    }, [user, methods]);

    const onSubmit = async (data: EmailForm) => {
        try {
            if (!user) throw new Error("No user found");

            setLoading(true);

            const userRef = doc(db, "admins", user.adminId);

            await updateDoc(userRef, {
                email: data.email,
            });

            showToast("Email updated successfully", "success");
        } catch (error: any) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "440px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                m: "auto",
            }}
        >
            <FormProvider {...methods}>
                <form style={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Typography sx={{ fontWeight: 500, color: COLORS.gray.main }}>
                        * If you require a new login to CollabMind Admin panel, please update
                        the email address below.
                    </Typography>

                    <CustomTextField
                        name="email"
                        placeholder=""
                        type="email"
                        width="100%"
                        label="Email"
                    />
                    <br />
                    <CustomButton
                        variant="contained"
                        title={
                            loading ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                "Update"
                            )
                        }
                        type="submit"
                        fullWidth
                        disabled={loading}
                    />
                </form>
            </FormProvider>
        </Box>
    );
};

export default EmailTab;
