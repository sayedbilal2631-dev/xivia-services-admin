"use client"
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

interface MenuItemType {
    label: string;
    action: () => void;
}

interface MoreVertMenuProps {
    items: MenuItemType[];
    icon?: React.ReactNode;
    isAvatar?: boolean
}

const MoreVertMenu = ({ items, icon, isAvatar }: MoreVertMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton size="small" onClick={handleMenuOpen}  >
                {icon ? icon : <MoreVertIcon />}
            </IconButton>
            {isAvatar &&
                <Avatar sx={{ width: 50, height: 50 }} onClick={handleMenuOpen} />
            }
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        onClick={() => {
                            handleMenuClose();
                            item.action();
                        }}
                        sx={{ p: '10px 16px', width: '200px' }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreVertMenu;
