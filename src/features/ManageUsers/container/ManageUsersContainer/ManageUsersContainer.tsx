import { CustomButton, PageHeader, CustomDialogBox } from "components";
import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import TeamMember from "features/ManageUsers/components/GetTeam/Team";
import { ManangeAddUserContainer } from "features/ManangeAddUser";
import { FormProvider, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { db } from "libs";

export interface Team {
    id?:any;
    name: string;
    description: string;
    role: string;
    images: string;
}

const ManageMemberContainer = () => {
    const methods = useForm();
    const [team, setTeam] = useState<any[]>([]);

    // Fetch team members
    const fetchTeam = async () => {
        const getRef = await getDocs(collection(db, "team-member"));
        const items = getRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Team
        }));
        setTeam(items);
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    // Dialog state for Add/Edit
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Team | null>(null);

    const handleOpenDialog = (member?: Team) => {
        if (member) setSelectedMember(member);
        else setSelectedMember(null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    // Delete member
    const delMember = async (id: string) => {
        await deleteDoc(doc(db, "team-member", id));
        alert("Member deleted successfully");
        setTeam(prev => prev.filter(mem => mem.id !== id));
    };

    return (
        <FormProvider {...methods}>
            <Stack gap={2}>
                <PageHeader title="Manage Employees" />

                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <CustomButton
                        variant="contained"
                        title="Add New Employee"
                        onClick={() => handleOpenDialog()}
                        endIcon={<Add />}
                    />
                </Stack>

                {/* Add/Edit Dialog */}
                <CustomDialogBox open={openDialog} onClose={handleCloseDialog} title={selectedMember ? "Update Employee" : "Add Employee"}>
                    <ManangeAddUserContainer
                        open={handleCloseDialog}
                        initialData={selectedMember ? {
                            firstName: selectedMember.name.split(" ")[0],
                            lastName: selectedMember.name.split(" ").slice(1).join(" "),
                            about: selectedMember.description,
                            role: selectedMember.role,
                            memberRole: [], 
                            facebook: "",
                            linkedin: "",
                        } : undefined}
                        id={selectedMember?.id}
                        onSuccess={fetchTeam} 
                    />
                </CustomDialogBox>

                {/* Table */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {team.map(mem => (
                            <TeamMember
                                key={mem.id}
                                id={mem.id}
                                name={mem.name}
                                description={mem.description}
                                role={mem.role}
                                images={mem.images}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => delMember(mem.id)}
                                    sx={{ padding: "8px", bgcolor: "red", mr: 2 }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleOpenDialog(mem)}
                                    sx={{ padding: "8px", bgcolor: "teal" }}
                                >
                                    Update
                                </Button>
                            </TeamMember>
                        ))}
                    </TableBody>
                </Table>
            </Stack>
        </FormProvider>
    );
};

export default ManageMemberContainer;
