import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useLocation} from 'react-router-dom';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function Navbar() {
  const [value, setValue] = React.useState('Dashboard');
  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    if (currentPath === '/') {
      setValue('Dashboard');
    } else if (currentPath.startsWith('/progress')) {
      setValue('Progress');
    } else if (currentPath.startsWith('/add')) {
      setValue('Add');
    } else if (currentPath === '/profile') {
      setValue('Profile');
    }
  }, [currentPath]);

  return (
    <>
        <BottomNavigation 
            sx={{ position: 'fixed',bottom: 0,margin:0, width: '100%',height:'10%' ,zIndex:2}}
            value={value}
        >
            <BottomNavigationAction
                component={Link}
                to="/"
                label="Dashboard"
                value="Dashboard"
                icon={<DashboardIcon />}
        />
             <BottomNavigationAction
                component={Link}
                to="/progress/workouts"
                label="Progress"
                value="Progress"
                icon={<FitnessCenterIcon />}
        />
            <BottomNavigationAction
                component={Link}
                to="/add/workout"
                label="Add"
                value="Add"
                icon={<AddCircleOutlineOutlinedIcon />}
        />
             <BottomNavigationAction
                component={Link}
                to="/profile"
                label="Profile"
                value="Profile"
                icon={<AccountCircleOutlinedIcon />}
        />
        </BottomNavigation>
    </>
)}