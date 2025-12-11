import { Add, Delete, Edit } from "@mui/icons-material";
import {
    Box,
    Stack,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { CustomButton, CustomDialogBox, PageHeader } from "components";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "libs";
import { AddProjectForm } from "screens";

interface Project {
    id: string;
    title: string;
    client: string;
    category: string;
    description: string;
    link: string;
    image?: string;
}

const ManageProjectContainer = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [editProject, setEditProject] = useState<Project | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const snap = await getDocs(collection(db, "gallery"));
            const list: Project[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<Project, "id">),
            }));
            setProjects(list);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);


    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        await deleteDoc(doc(db, "gallery", id));
        fetchProjects();
    };

    const handleEdit = (project: Project) => {
        setEditProject(project);
        setOpenDialog(true);
    };

    const handleAddNew = () => {
        setEditProject(null);
        setOpenDialog(true);
    };

    return (
        <Box>
            <PageHeader title="Manage Projects" />

            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <CustomButton
                    variant="contained"
                    title="Add New Project"
                    onClick={handleAddNew}
                    endIcon={<Add />}
                />
            </Stack>

            {/* TABLE */}
            <Box mt={3}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Link</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {projects.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.title}</TableCell>
                                    <TableCell>{p.client}</TableCell>
                                    <TableCell>{p.category}</TableCell>
                                    <TableCell>{p.link}</TableCell>

                                    <TableCell sx={{ maxWidth: 200 }}>
                                        {p.description.length > 80
                                            ? p.description.slice(0, 80) + "..."
                                            : p.description}
                                    </TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(p)}>
                                            <Edit color="primary" />
                                        </IconButton>

                                        <IconButton onClick={() => handleDelete(p.id)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Box>

            {/* ADD / EDIT DIALOG */}
            <CustomDialogBox
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title={editProject ? "Update Project" : "Add Project"}
            >
                <AddProjectForm
                    project={editProject}
                    onClose={() => {
                        setOpenDialog(false);
                        fetchProjects();
                    }}
                />
            </CustomDialogBox>
        </Box>
    );
};

export default ManageProjectContainer;
