import CustomDialogBox from "components/CustomDialogBox/CustomDialogBox";
import MoreVertMenu from "components/MoreVertMenu/MoreVertMenu";
import { Avatar, Stack, Typography } from "@mui/material";
import { Logout, ManageAccounts} from "@mui/icons-material";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router";
import { COLORS } from "constant/color";
import { ROUTES } from "constant";
import { useState } from "react";


const UserCard = () => {
  const { logout } = useAuth()
  const [showLogout, setShowLogout] = useState(false);
  const [manageHeader, setmanageHeader] = useState(false);
  const naviagte = useNavigate();

  const { user } = useAuth()
  const handleLogout = () => {
    logout()
    naviagte(ROUTES.LOGIN)
    setShowLogout(false);
  };

  //  const handleHeader = () => {

  //   logout()
  //   naviagte(ROUTES.ManageHeader);
  //   setmanageHeader(false);
  // };
  const handleHeader = () => {
 
  // naviagte(ROUTES.ManageHeader)
  setmanageHeader(false)
};

  const menuItems = [
    { label: "Logout", action: () => setShowLogout(true) },
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Stack flexGrow={1}>
        <Typography sx={{ fontWeight: 500, fontSize: "18px", color: COLORS.primary.hard }}>

          {user?.firstName} <Typography component={'span'} sx={{ textTransform: 'lowercase' }}>
            {user?.lastName}
          </Typography>
        </Typography>
        <Typography variant="body2" color={COLORS.primary.hard}>
          {user?.role}
        </Typography>
      </Stack>

      <MoreVertMenu items={menuItems} isAvatar={true} />


      {showLogout && (
        <CustomDialogBox
          open={showLogout}
          title="Log out?"
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
          confirmText="Yes, Logout"
          icon={<Logout />}
        >
          Are you sure you want to log out?
        </CustomDialogBox>
      )}
    </Stack>
  );
};

export default UserCard;
