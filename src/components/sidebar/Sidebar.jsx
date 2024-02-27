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
import { useMediaQuery, Link as MuiLink} from "@mui/material";
import  {useLogout } from "../../services/api/userService";

const Sidebar = () => {

const logout = useLogout()

  // Logout user and redirect to login
  const handleLogout  = (e) => {
    logout();
  }
  
  return (
      <div className="sidebar">
      <div className="top">
      <MuiLink component={Link}to="/" style={{ textDecoration: "none" }}>
          <span className="logo" style={{color:PRIMARY}}>workoutTracker</span>
        </MuiLink>
      </div>
      <hr />
      
      <div className="center">
        <ul>
          <p className="title">START</p>
              <MuiLink  component={Link} to="/" style={{ textDecoration: "none" }}>
                 <li>
                    <DashboardIcon className="icon" />
                      <span>Dashboard</span>
                 </li>
              </MuiLink>

          <p className="title">PROGRESS</p>
              <MuiLink component={Link} to="/history/workouts" style={{ textDecoration: "none" }}>
                  <li>
                    <FitnessCenterIcon  className="icon" />
                    <span>Your Progress</span>
                  </li>
              </MuiLink>
          
          <p className="title">ADD</p>
              <MuiLink component={Link} to="/add/workout" style={{ textDecoration: "none" }}>
                  <li>
                    <AddCircleOutlineOutlinedIcon className="icon" />
                    <span>Workouts</span>
                </li>
              </MuiLink>
          
          <p className="title">PROFILE AND SETTINGS</p>
            <MuiLink component={Link} to="/profile" style={{ textDecoration: "none" }}>
              <li>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
              </li>
            </MuiLink>
          
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
