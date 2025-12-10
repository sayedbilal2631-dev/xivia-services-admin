import { COLORS } from "constant/color";
import { useEffect, useState } from "react";
import AddAdmin from "../AddAdmin/AddAdmin";
import { Box, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { CustomDialogBox, MoreVertMenu } from "components";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "libs";

type AdminProps = {
    admin: {
        adminId: string;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
    };
    onEdit: () => void;
};

const AdminCard = ({ admin }: AdminProps) => {
    const methods = useForm({
        defaultValues: {
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: admin.role,
            phoneNumber: admin.phoneNumber || "",
        },
    });

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const menuItems = [
        { label: "Edit", action: () => setShowEdit(true) },
        { label: "Delete", action: () => setShowDelete(true) },
    ];

    const handleDeleteAdmin = async () => {
        try {
            setIsDeleting(true);
            const adminRef = doc(db, "admins", admin.adminId);
            await deleteDoc(adminRef);
            setShowDelete(false);
            // Optionally refresh the list or show success message
        } catch (error) {
            console.error("Error deleting admin:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditAdmin = async (data: any) => {
        try {
            setIsUpdating(true);
            const adminRef = doc(db, "admins", admin.adminId);
            await updateDoc(adminRef, data);
            setShowEdit(false);
            methods.reset();
            // Optionally refresh the list or show success message
        } catch (error) {
            console.error("Error updating admin:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (showEdit) {
            methods.reset({
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                role: admin.role,
                phoneNumber: admin.phoneNumber || "",
            });
        }
    }, [showEdit, admin, methods]);

    return (
        <>
            <Stack
                sx={{
                    height: "301px",
                    width: { md: '190px', sm: '45%', xs: '98%' },
                    padding: "30px 10px",
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
                    borderRadius: "12px",
                    alignItems: "center",
                    gap: "24px",
                }}
            >
                <Stack direction={"column"} sx={{ width: "100%", alignItems: "center" }}>
                    <Box sx={{ display: 'flex', alignSelf: 'end' }}>
                        <MoreVertMenu items={menuItems} />
                    </Box>

                    <Box
                        component={"img"}
                        src="/assets/images/adminProfile.png"
                        sx={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </Stack>

                <Box>
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                            display: "block",
                            textAlign: "center",
                        }}
                    >
                        {`${admin.firstName} ${admin.lastName}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: COLORS.black.darkGray, textAlign: 'center' }}
                    >
                        {admin.role}
                    </Typography>
                </Box>

                <Typography variant="body2">{admin.email}</Typography>
            </Stack>

            <CustomDialogBox
                open={showDelete}
                title="Delete Admin"
                onClose={() => setShowDelete(false)}
                onConfirm={handleDeleteAdmin}
                confirmText={isDeleting ? "Deleting..." : "Yes, I confirm"}
            >
                {`Are you sure you want to delete the admin "${admin.firstName} ${admin.lastName}"?`}
            </CustomDialogBox>

            <CustomDialogBox
                open={showEdit}
                title="Update Admin"
                onClose={() => setShowEdit(false)}
                onConfirm={methods.handleSubmit(handleEditAdmin)}
                confirmText={isUpdating ? "Updating..." : "Update Admin"}
            >
                <FormProvider {...methods}>
                    <AddAdmin mode="edit" />
                </FormProvider>
            </CustomDialogBox>
        </>
    );
};

export default AdminCard;