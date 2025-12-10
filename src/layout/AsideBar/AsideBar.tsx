import { Drawer, IconButton, Stack, useMediaQuery, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import { COLORS } from "constant/color";
import { NAVDATA } from "constant";
import { useState } from "react";

const AsideBar = () => {
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:650px)");
    const [open, setOpen] = useState(false);


    const renderNavItems = (isDrawer = false) => (
        <Stack
            sx={{
                height: "100%",
                width: isDrawer ? "260px" : "240px",
                pt: "40px",
                gap: "16px",
                alignItems: "center",
                backgroundColor: COLORS.primary.light,
                borderRight: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "4px 0 16px rgba(0,0,0,0.08)",

                borderTopRightRadius: "14px",
                borderBottomRightRadius: "14px",
            }}
        >
            {isDrawer && (
                <>
                    <Typography
                        sx={{
                            position: "absolute",
                            top: 16,
                            left: 18,
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: COLORS.white.light,
                        }}
                    >
                        Menu
                    </Typography>

                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            color: COLORS.white.light,
                        }}
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            )}

            {/* Sidebar buttons */}
            {NAVDATA.map((navItem) => {
                const isActive = location.pathname === navItem.path;

                return (
                    <Link
                        key={navItem.path}
                        to={navItem.path}
                        style={{ textDecoration: "none", width: "100%" }}
                        onClick={() => isMobile && setOpen(false)}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                mx: "auto",
                                width: "200px",
                                height: "52px",
                                px: 2,
                                alignItems: "center",
                                borderRadius: "12px",
                                cursor: "pointer",
                                transition: "250ms ease",

                                // ⭐ Active State
                                backgroundColor: isActive
                                    ? COLORS.primary.hardDark
                                    : COLORS.primary.light,
                                border: isActive
                                    ? "2px solid rgba(255,255,255,0.3)"
                                    : "2px solid transparent",

                                // ⭐ Hover
                                "&:hover": {
                                    backgroundColor: COLORS.primary.hardDark,
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            <navItem.icon
                                sx={{
                                    fontSize: "24px",
                                    color: isActive
                                        ? COLORS.white.light
                                        : COLORS.white.thin,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    color: isActive
                                        ? COLORS.white.light
                                        : COLORS.white.thin,
                                    textTransform: "capitalize",
                                }}
                            >
                                {navItem.title}
                            </Typography>
                        </Stack>
                    </Link>
                );
            })}
        </Stack>
    );

    if (isMobile) {
        return (
            <>
                <IconButton
                    sx={{
                        backgroundColor: COLORS.primary.light,
                        color: COLORS.white.light,
                        borderRadius: "10px",
                        padding: "10px",
                        margin: "10px",
                        "&:hover": {
                            backgroundColor: COLORS.primary.hardDark,
                        },
                    }}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon sx={{ fontSize: 26 }} />
                </IconButton>

                <Drawer
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{
                        sx: {
                            width: "260px",
                            backgroundColor: COLORS.primary.light,
                        },
                    }}
                >
                    {renderNavItems(true)}
                </Drawer>
            </>
        );
    }


    return (
        <Stack
            component="aside"
            sx={{
                position: "sticky",
                top: 0,
                height: "100vh",
                minWidth: "240px",
                zIndex: 1200,
            }}
        >
            {renderNavItems()}
        </Stack>
    );
};

export default AsideBar;
