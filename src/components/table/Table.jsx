import React from "react";
import dayjs from 'dayjs';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { PRIMARY } from "../general/Constants";
import { FitnessCenterTwoTone } from "@mui/icons-material";

const WorkoutList = ({ workouts, monthYear }) => {

  const last5workouts =workouts.length >= 5 ? workouts.slice(0,5) : workouts.slice(0, workouts.length)
  return (
    <List sx={{width:'88%'}}>
      {last5workouts.map((workout) => (
        <ListItem key={workout.id}>
          <ListItemAvatar>
            <Avatar sx={{backgroundColor: PRIMARY}}>
              <FitnessCenterTwoTone  />
            </Avatar>
          </ListItemAvatar >
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
                  {dayjs(workout.date).format('DD/MM/YYYY')} <br />
                 from {workout.start} to {workout.end} <br />
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default WorkoutList;
