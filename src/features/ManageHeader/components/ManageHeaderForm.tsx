import { CustomTextField, FormWraper, } from "components";
import { FormProvider, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import { ROUTES } from "constant";
import { useState } from "react";
import { db } from "libs";



interface formDataType {
    Header: string,
    title: string,
    subtitle: string,
    logo: File
}

const ManageHeaderForm = () => {
    const navigate = useNavigate();
    const methods = useForm<formDataType>();
    const { handleSubmit } = methods;
    const [getData, setGetData] = useState<formDataType>({})
    const onSubmit = async (data: formDataType): Promise<void> => {
        try {
            await addDoc(collection(db, 'manageHeader'), {
                header: data.Header,
                title: data.title,
                Subtitle: data.subtitle,
                logo: data.logo
            })
            navigate(ROUTES.ADMINS);
        } catch (error: any) {
            console.error("Login failed:", error.message);
        }
    };
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', padding: "0px" }}>

            <FormProvider {...methods}>
                <form
                    onSubmit={() => handleSubmit(onSubmit)}
                >

                    <CustomTextField
                        type="email"
                        placeholder="Enter a Header"
                        name="Header"
                        label="Header"
                        width="100%"
                    />

                    <CustomTextField
                        type="text"
                        placeholder="Enter a title"
                        name="Title"
                        label="Title"
                        width="100%"

                    />
                    <CustomTextField
                        type="text"
                        placeholder="Enter a Sub-Title"
                        name="Sub-Title"
                        label="Sub-Title"
                        width="100%"
                    />
                    <CustomTextField
                        type="file"
                        name="logo"
                        label="Logo"
                        width="100%"
                        placeholder="logo"
                    />
                    {/* <CustomTextField
                        type="file"
                        name=""
                        label="App Title"
                        width="100%"
                        placeholder="file"
                    /> */}
                </form>
            </FormProvider>

        </Stack>
    );
};

export default ManageHeaderForm;
