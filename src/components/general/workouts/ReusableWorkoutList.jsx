import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { FitnessCenterTwoTone } from '@mui/icons-material';
import { PRIMARY } from '../Constants';

const ReusableWorkoutList = ({ workouts }) => {
  return (
    <div>
      <List>
        {workouts && workouts.map((workout) => (
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
    </div>
  );
};

export default ReusableWorkoutList;
