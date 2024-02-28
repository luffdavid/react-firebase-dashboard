import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { PRIMARY } from "../reusable/Main";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useMediaQuery} from "@mui/material";
import  {useLogout } from "../../services/api/userService";

const Sidebar = () => {

const logout = useLogout()

  const handleLogout  = () => {
    logout();
  }
  
  return (
      <div className="sidebar">
      <div className="top">
      <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo" style={{color:PRIMARY}}>workoutTracker</span>
        </Link>
      </div>
      
      <div className="center">
        <ul>
          <p className="title">START</p>
              <Link   to="/" style={{ textDecoration: "none" }}>
                 <li>
                    <DashboardIcon className="icon" />
                      <span>Dashboard</span>
                 </li>
              </Link>

          <p className="title">PROGRESS</p>
              <Link  to="/progress/workouts" style={{ textDecoration: "none" }}>
                  <li>
                    <FitnessCenterIcon  className="icon" />
                    <span>Your Progress</span>
                  </li>
              </Link>
          
          <p className="title">ADD</p>
              <Link  to="/add/workout" style={{ textDecoration: "none" }}>
                  <li>
                    <AddCircleOutlineOutlinedIcon className="icon" />
                    <span>Workouts</span>
                </li>
              </Link>
          
          <p className="title">PROFILE AND SETTINGS</p>
            <Link  to="/profile" style={{ textDecoration: "none" }}>
              <li>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
              </li>
            </Link>
          
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span style={{color:'red'}}>Logout</span>
          </li>
          {/* <li>
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
          </li> */}
        </ul>
      </div>

      
    </div>
    );
};

export default Sidebar;
