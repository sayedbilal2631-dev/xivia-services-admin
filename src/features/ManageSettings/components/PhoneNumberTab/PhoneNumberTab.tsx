import { CustomButton, CustomPhoneNumberField } from "components";
import { Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { COLORS } from "constant/color";

interface PhoneForm {
    phoneNumber: string;
}

const PhoneNumberTab = () => {
    const methods = useForm<PhoneForm>({
        defaultValues: {
            phoneNumber: "",
        },
    });

    const onSubmit = (data: PhoneForm) => {
        console.log("Updated Phone:", data.phoneNumber);
    };

    return (
        <Stack spacing={2} sx={{ maxWidth: "440px", mx: "auto" }}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Typography sx={{ fontWeight: 500, color: COLORS.gray.main, mb: 3 }}>
                        * If you require a new phone number for Two Factor Authentication to CollabMind
                        Admin panel, please update your number below.
                    </Typography>

                    <CustomPhoneNumberField name="phoneNumber" />
                    <br />
                    <CustomButton
                        variant="contained"
                        title="Update"
                        type="submit"
                        fullWidth
                    />
                </form>
            </FormProvider>
        </Stack>
    );
};

export default PhoneNumberTab;
