import { IconButton } from "@mui/material";
import MainDrawer from "../../general/drawer/MainDrawer";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';


export default function LastWorkout({ workout }) { 
    const drawerContent = 
        <div style={{marginTop:'3%'}}>
            Workout: {workout.title} <br />
            Date: {workout.date} <br />
            Exercises: {workout.exercisesAndWeight}
            Notes: {workout.notes}
        </div>
    
  return (
    <div>
        {workout.title}
        <div>
        <MainDrawer drawerTitle={"Your last Workout"}  drawerContent={drawerContent} drawerOpenButton={<IconButton><OpenInNewRoundedIcon /></IconButton>} />
        </div>
       
    </div>
  );
}
