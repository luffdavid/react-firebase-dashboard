import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useLogout } from "../../../services/api/userService";
import { PRIMARY } from "../Constants";

const Sidebar = () => {
  const logout = useLogout()

  const handleLogout  = () => {
    logout();
  }
  
  return (
      <div className="sidebar">
      <div className="top">
      <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo" style={{color:PRIMARY}}>workoutGuru</span>
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
              <Link  to="/progress" style={{ textDecoration: "none" }}>
                  <li>
                    <FitnessCenterIcon  className="icon" />
                    <span>Your Progress</span>
                  </li>
              </Link>
          
          <p className="title">ADD</p>
              <Link  to="/add" style={{ textDecoration: "none" }}>
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
