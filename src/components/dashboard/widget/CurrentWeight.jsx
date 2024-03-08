import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import MainDrawer from "../../general/drawer/MainDrawer";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { PRIMARY } from "../../general/Constants";
import { FitnessCenterTwoTone } from "@mui/icons-material";
import dayjs from "dayjs";
import ReusableWorkoutList from "../../general/workouts/ReusableWorkoutList";
import WeightDrawerContent from "../../general/weight/WeightDrawerContent";


export default function CurrentWeight({ weights }) { 
    const drawerContent = 
    weights ? (
     <WeightDrawerContent weight={weights[0]} />
    ) : (
      <>
      No weight measurements available</>
    )
         
  return (
    <div>
        <div>
        <MainDrawer drawerTitle={"Your current Weight"}  drawerContent={drawerContent} buttonVariant={"text"} drawerOpenButton={<OpenInNewRoundedIcon color="primary" />} />
        </div>
       
    </div>
  );
}
