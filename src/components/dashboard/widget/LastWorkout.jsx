import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import MainDrawer from "../../general/drawer/MainDrawer";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { PRIMARY } from "../../general/Constants";
import { FitnessCenterTwoTone } from "@mui/icons-material";

export default function LastWorkout({ workout }) { 
    const drawerContent = workout && (
      <List>
        <ListItem key={workout.id}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: PRIMARY }}>
              <FitnessCenterTwoTone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant='h6'>{workout.title}</Typography>
            }
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
              > 
                {workout.date} <br />
                from {workout.start} to {workout.end} <br />
              </Typography>
            }
          />
        </ListItem>
      </List>
    );

  return (
    <div>
      <div>
        <MainDrawer drawerTitle={"Your last Workout"}  drawerContent={drawerContent} buttonVariant={"text"} drawerOpenButton={<OpenInNewRoundedIcon color="primary" />} />
      </div>
    </div>
  );
}
