import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import MainDrawer from "../../general/drawer/MainDrawer";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { PRIMARY } from "../../general/Constants";
import { FitnessCenterTwoTone } from "@mui/icons-material";
import dayjs from "dayjs";


export default function WorkoutsThisMonth({ workouts }) { 
    const drawerContent = 
        <List>
          {workouts.map((workout) => (
        <ListItem key={workout.id}>
          <ListItemAvatar>
            <Avatar sx={{backgroundColor: PRIMARY}}>
              <FitnessCenterTwoTone  />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography variant='h6'>{workout.title}</Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                > 
                {workout.date} <br />
                 from {workout.start} to {workout.end} <br />
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
         
  return (
    <div>
        {workouts.length}
        <div>
        <MainDrawer drawerTitle={"Workouts this month"}  drawerContent={drawerContent} buttonVariant={"text"} drawerOpenButton={<OpenInNewRoundedIcon color="secondary" />} />
        </div>
       
    </div>
  );
}
