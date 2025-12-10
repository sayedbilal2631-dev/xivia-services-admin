import { Box, Typography, Divider, Grid, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import { CustomButton, CustomSelect, CustomTextField, MultipulCustomSelect } from "components";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useForm, FormProvider } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { MEMBER_ROLE } from "constant";
import { MemberFormData } from "types";
import { db } from "libs";

const Section = ({ title }: { title: string }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
        </Typography>
        <Divider />
    </Box>
);

interface Props {
    open?: () => void; 
    initialData?: any; 
    id?: string; 
    onSuccess?: () => void; 
}

const ManangeAddUserContainer: React.FC<Props> = ({ open, initialData, id, onSuccess }) => {
    const methods = useForm<MemberFormData>({
        defaultValues: initialData || {
            firstName: "",
            lastName: "",
            about: "",
            role: "",
            memberRole: [],
            facebook: "",
            linkedin: "",
        },
    });

    const { reset } = methods;
    const [disableSocial, setDisableSocial] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setDisableSocial(!initialData.facebook && !initialData.linkedin);
        }
    }, [initialData]);

    const onSubmit = async (data: MemberFormData) => {
        const uploadData = {
            name: `${data.firstName} ${data.lastName}`,
            description: data.about,
            role: data.role,
            memberRole: data.memberRole,
            socialLinks: {
                facebook: data.facebook,
                linkedin: data.linkedin,
            },
        };

        try {
            setLoading(true);

            if (id) {
                await updateDoc(doc(db, "team-member", id), uploadData);
                alert("Member updated successfully");
            } else {
                await addDoc(collection(db, "team-member"), uploadData);
                alert("Member added successfully");
            }

            reset();
            open?.();      // close dialog
            onSuccess?.(); 
        } catch (error) {
            console.error(error);
            alert(`Error occurred: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <Section title="Personal Details" />

                <Grid container spacing={2}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <CustomTextField
                            type="text"
                            maxLength={25}
                            name="firstName"
                            label="First Name"
                            placeholder="Enter first name"
                        />
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <CustomTextField
                            type="text"
                            name="lastName"
                            maxLength={25}
                            label="Last Name"
                            placeholder="Enter last name"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField
                            name="about"
                            type="text"
                            label="About"
                            placeholder="Write about yourself"
                            multiline
                            minRows={2}
                        />
                    </Grid>
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                    <CustomSelect
                        name="role"
                        label="Role"
                        options={MEMBER_ROLE.map((m) => ({ label: m, value: m }))}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <MultipulCustomSelect
                        name="memberRole"
                        label="Member Role Skills"
                        options={MEMBER_ROLE.map((s) => ({ label: s, value: s }))}
                    />
                </Grid>

                <Section title="Social Links" />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={disableSocial}
                            onChange={(e) => setDisableSocial(e.target.checked)}
                        />
                    }
                    label="Disable"
                    sx={{ ml: "auto" }}
                />

                <Grid container spacing={2}>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <CustomTextField
                            type="link"
                            name="facebook"
                            label="Facebook"
                            placeholder="Facebook profile URL"
                            disabled={disableSocial}
                        />
                    </Grid>
                    <Grid size={{ md: 6, xs: 12 }}>
                        <CustomTextField
                            type="link"
                            name="linkedin"
                            label="LinkedIn"
                            placeholder="LinkedIn profile URL"
                            disabled={disableSocial}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <CustomButton
                        title={loading ? "Creating..." : "Submit"}
                        type="submit"
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    />
                </Box>
            </Box>
        </FormProvider>
    );
};

export default ManangeAddUserContainer;


