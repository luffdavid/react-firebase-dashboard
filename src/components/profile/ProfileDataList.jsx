import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ContrastRoundedIcon from "@mui/icons-material/ContrastRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinearScaleRoundedIcon from "@mui/icons-material/LinearScaleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import * as React from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useLogout } from "../../services/api/userService";

const ProfileDataList = ({ profileData }) => {
  const logout = useLogout();
  const { dispatch } = React.useContext(DarkModeContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <List
        sx={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          bgcolor: "background.paper",
        }}
      >
        <ListSubheader sx={{ borderRadius: "15px" }}>
          Personal Information
        </ListSubheader>
        <ListItem>
          <ListItemIcon color="PRIMARY">
            <AccountCircleRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Name: " + profileData.displayName} />
          <IconButton edge="end">{/* <EditRoundedIcon /> */}</IconButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <LinearScaleRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Username: " + profileData.username} />
          <IconButton edge="end">{/* <EditRoundedIcon /> */}</IconButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <EmailRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Email: " + profileData.email} />
          <IconButton edge="end">{/* <EditRoundedIcon /> */}</IconButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PasswordRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Password: *********" />
          <IconButton edge="end">{/* <EditRoundedIcon /> */}</IconButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PasswordRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <React.Fragment>
                Profile Image:{" "}
                <img src={profileData?.img} alt="No img provided" />
              </React.Fragment>
            }
          />
          <IconButton edge="end">{/* <EditRoundedIcon /> */}</IconButton>
        </ListItem>
      </List>

      <List
        sx={{
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          bgcolor: "background.paper",
        }}
      >
        <ListSubheader sx={{ borderRadius: "15px" }}>
          App Settings
        </ListSubheader>

        <ListItem>
          <ListItemIcon>
            <ContrastRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <Button
                  onClick={() => dispatch({ type: "TOGGLE" })}
                  variant="outlined"
                >
                  Change Theme
                </Button>
              </>
            }
          />
          <IconButton edge="end">{/* <EditRoundedIcon /> */}</IconButton>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText>
            <Button onClick={handleLogout} color="error" variant="outlined">
              Logout
            </Button>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default ProfileDataList;
