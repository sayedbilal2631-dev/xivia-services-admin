import { Avatar, Box, IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import { CustomButton, CustomTextField } from "components";
import { useAuth, useToast } from "context";
import { FormProvider, useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs";
import { useState } from "react";

interface FormValues {
    firstName: string;
    lastName: string;
}

const AccountInfoTab = () => {
    const { user } = useAuth();
    const { showToast } = useToast();

    const [loading, setLoading] = useState(false);
    console.log(user)
    const methods = useForm<FormValues>({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) console.log("Selected file:", file);
    };

    const onSubmit = async (data: FormValues) => {
        try {
            if (!user) throw new Error("No user found");

            setLoading(true);

            const userRef = doc(db, "admins", user.adminId);

            await updateDoc(userRef, {
                firstName: data.firstName,
                lastName: data.lastName,
            });

            showToast("User updated successfully", "success");
        } catch (e) {
            showToast(`${e}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack gap={"30px"}>
            <Typography sx={{ fontSize: "20px", fontWeight: 900 }}>
                Account Information
            </Typography>

            <Stack direction="row" sx={{ maxWidth: "500px", gap: "30px" }}>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Stack gap="20px" width={"100%"}>
                            <CustomTextField
                                name="firstName"
                                type="text"
                                placeholder=""
                                label="First Name"
                                width="100%"
                            />

                            <CustomTextField
                                name="lastName"
                                type="text"
                                placeholder=""
                                label="Last Name"
                                width="100%"
                            />

                            <CustomButton
                                title={
                                    loading ? (
                                        <CircularProgress size={22} color="inherit" />
                                    ) : (
                                        "Update"
                                    )
                                }
                                variant="contained"
                                type="submit"
                                fullWidth
                                disabled={loading}
                            />
                        </Stack>
                    </form>
                </FormProvider>
            </Stack>
        </Stack>
    );
};

export default AccountInfoTab;
