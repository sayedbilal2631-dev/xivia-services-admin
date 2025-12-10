import CustomTextField from "components/CustomTextField/CustomTextField";
import CustomButton from "components/CustomButton/CustomButton";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";
import UserCard from "components/UserCard/UserCard";
import { Add } from "@mui/icons-material";
import { COLORS } from "constant";

interface PageHeaderProps {
    leftComponent?: "button" | "textfield";
    buttonTitle?: string;
    buttonIcon?: React.ReactNode;
    textFieldName?: string;
    textFieldPlaceholder?: string;
    title: string
    onClick?: () => void;
}


const PageHeader: React.FC<PageHeaderProps> = ({
    leftComponent = "textfield",
    buttonTitle = "Add",
    buttonIcon = <Add />,
    textFieldName = "search",
    textFieldPlaceholder = "Search user",
    title = "Manage Users",
    onClick,
}) => {
    const method = useForm();

    return (
        <FormProvider {...method}>
            <Stack
                direction={"row"}
                gap={"20px"}
                sx={{
                    mt: 3,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    mb: 3,
                }}
            >
                {leftComponent === "button" ? (
                    <>
                        <CustomButton
                            title={buttonTitle}
                            variant="contained"
                            startIcon={buttonIcon}
                            onClick={onClick}
                        />

                    </>
                ) :
                    (
                        <CustomTextField
                            name={textFieldName}
                            placeholder={textFieldPlaceholder}
                            type="text"
                            width="285px"
                            showSearchIcon={true}
                        />
                    )}

                <Typography
                    sx={{
                        fontSize: "23px",
                        fontWeight: "600",
                        fontFamily: "Outfit, sans-serif",
                        color: COLORS.black,
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', order: { sm: 3, xs: -1 }, width: { sm: 'auto', xs: '100%' }, justifyContent: 'end' }}>
                    <UserCard />
                </Box>
            </Stack>

        </FormProvider >
    );
};

export default PageHeader;


