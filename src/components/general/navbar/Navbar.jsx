import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import { usePrimary } from "../Constants";
import "./navbar.scss";

const Navbar = ({ profileData, isDarkMode }) => {
  const PRIMARY = usePrimary();
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Language
          </div> */}
          <div className="item">
            {!isDarkMode ? (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            ) : (
              <LightModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            )}
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            {/* <Avatar
              className="avatar"
            >{profileData?.displayName.charAt(0).toUpperCase()}</Avatar> */}
            <Avatar className="avatar" sx={{ backgroundColor: PRIMARY }}>
              <>{profileData?.displayName.charAt(0).toUpperCase()}</>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
