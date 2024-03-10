import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useContext } from "react";
import { Avatar } from "@mui/material";
import { DarkModeContext } from "../../../context/darkModeContext";

const Navbar = ({profileData, isDarkMode}) => {
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
           <Avatar
              className="avatar"
            ><img src={profileData?.img} style={{ zoom:'20%'}} />
            </Avatar>
          </div>
          </div>

        </div>
      </div>
    // </div>
  );
};

export default Navbar;
