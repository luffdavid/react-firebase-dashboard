import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {


  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const handleLogout  = (e) => {
    e.preventDefault()
    dispatch({type:"LOGOUT"})
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      navigate("/login");
    }).catch((error) => {
      console.error(error);
    });
  }
  
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ME-Train</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">START</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">HISTORY</p>
          <Link to="/history/workouts" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Workouts</span>
            </li>
          </Link>
          <Link to="/history/weight" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Weight</span>
            </li>
          </Link>
          
          <p className="title">ADD</p>
          <Link to="/add/workout" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Workouts</span>
          </li>
          </Link>
          <Link to="/add/weight" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Weight measurement</span>
          </li>
          </Link>
          <p className="title">ANALYTICS</p>
          <Link to="/analyze/progress" style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Your Progress</span>
          </li>
          </Link>
          <p className="title">PROFILE AND SETTINGS</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li>
            <button  onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
            </button>
           
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
