import ManageHeaderForm from "features/ManageHeader/components/ManageHeaderForm";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { CustomButton, CustomDialogBox, PageHeader } from "components";
import { AddAdmin, AdminCard } from "features/ManageAdmins/components";
import { useAdmins } from "features/ManageAdmins/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { COLORS } from "constant/color";
import { Admin } from "collections";
import { useState } from "react";
import { auth, db } from "libs";

export type AdminWithId = Admin & { adminId: string };

const ManageAdminsContainer = () => {
    const methods = useForm<Admin>();
    const [isOpen, setIsOpen] = useState(false);
    const [manageHeader, setmanageHeader] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [selectedAdmin, setSelectedAdmin] = useState<AdminWithId | null>(null);

    const { data: adminsData = [], isLoading, refetch } = useAdmins();

    const handleConfirm = methods.handleSubmit(async (data) => {
        try {
            setIsSaving(true);
            
            if (selectedAdmin) {
                const adminRef = doc(db, "admins", selectedAdmin.adminId);
                await updateDoc(adminRef, {
                    ...data,
                    updatedAt: new Date(),
                });
                console.log("Admin updated successfully");
            } else {
                // ADD LOGIC 
                const adminsRef = collection(db, "admins");
                await addDoc(adminsRef, {
                    ...data,
                    createdAt: new Date(),
                    createdBy: auth.currentUser?.uid || null,
                    isActive: true,
                    lastLogin: null,
                });
                console.log("Admin added successfully");
            }

            methods.reset();
            setSelectedAdmin(null);
            setIsOpen(false);
            
            // Refetch the admin list
            refetch();
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsSaving(false);
        }
    });

    const handleHeader = () => {
        setmanageHeader(false);
    };

    // OPEN ADD ADMIN 
    const openAddAdmin = () => {
        setSelectedAdmin(null);
        methods.reset({
            role: undefined,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
        });
        setIsOpen(true);
    };

    // OPEN EDIT ADMIN 
    const openEditAdmin = (admin: AdminWithId) => {
        setSelectedAdmin(admin);
        methods.reset({
            role: admin.role || undefined,
            firstName: admin.firstName || "",
            lastName: admin.lastName || "",
            email: admin.email || "",
            phoneNumber: admin.phoneNumber || "",
        });
        setIsOpen(true);
    };

    return (
        <FormProvider {...methods}>
            <CustomDialogBox
                open={isOpen}
                title={selectedAdmin ? "Update Admin" : "Add New Admin"}
                onClose={() => {
                    setIsOpen(false);
                    setSelectedAdmin(null);
                }}
                onConfirm={handleConfirm}
                confirmText={isSaving ? "Saving..." : selectedAdmin ? "Update" : "Add Admin"}
            >
                <AddAdmin mode={selectedAdmin ? "edit" : "add"} />
            </CustomDialogBox>

            <PageHeader
                leftComponent="button"
                title="Manage Admins"
                onClick={openAddAdmin}
            />

            <Box>
                <CustomButton variant="outlined" title="Manage Header" onClick={() => setmanageHeader(!manageHeader)} />
                {manageHeader && (
                    <CustomDialogBox
                        open={manageHeader}
                        title="Manage Header Form"
                        onClose={() => setmanageHeader(false)}
                        onConfirm={handleHeader}
                        confirmText="Confirm"
                    >
                        <ManageHeaderForm />
                    </CustomDialogBox>
                )}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", my: 2 }}>
                {isLoading ? (
                    <Typography>Loading admins...</Typography>
                ) : adminsData.length === 0 ? (
                    <Typography
                        sx={{
                            width: "100%",
                            height: "100vh",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "29px",
                            color: COLORS.gray.light,
                        }}
                    >
                        No other admins
                    </Typography>
                ) : (
                    adminsData
                        .filter((myData) => myData.adminId !== auth.currentUser?.uid)
                        .map((admin: AdminWithId) => (
                            <AdminCard
                                key={admin.adminId}
                                admin={admin}
                                onEdit={() => openEditAdmin(admin)} 
                            />
                        ))
                )}
            </Box>
        </FormProvider>
    );
};

export default ManageAdminsContainer;