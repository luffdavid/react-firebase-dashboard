import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import MainDrawer from "../../general/drawer/MainDrawer";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { PRIMARY } from "../../general/Constants";
import { FitnessCenterTwoTone } from "@mui/icons-material";
import dayjs from "dayjs";
import ReusableWorkoutList from "../../general/workouts/ReusableWorkoutList";


export default function WorkoutsThisMonth({ workouts }) { 
    const drawerContent = <ReusableWorkoutList workouts={workouts} />
         
  return (
    <div>
        <div>
        <MainDrawer drawerTitle={"All Workouts"}  drawerContent={drawerContent} buttonVariant={"text"} drawerOpenButton={<OpenInNewRoundedIcon color="primary" />} />
        </div>
       
    </div>
  );
}
