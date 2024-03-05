import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material';
import React from  'react';
import { PRIMARY } from '../general/Constants';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs';
import WorkoutModall from './WorkoutModall';
import { FitnessCenterTwoTone } from '@mui/icons-material';
import WorkoutEditModal from '../progress/WorkoutEditModal';
import DeleteWorkoutModal from './DeleteWorkoutModal';
import MainDrawer from '../general/drawer/MainDrawer';


const WorkoutList = ({ workouts }) => {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [workout, setWorkout] = React.useState(null);
  

  const handleClickOpen = (workout) =>  {
    setOpen(true);
    setWorkout(workout);
  };

  const handleDeleteClickOpen = (workout) => {
    setDeleteOpen(true);
    setWorkout(workout);
  }
  const handleClose = () =>{ 
      setOpen(false);
      setWorkout(null)
};
const handleDeleteClose = () =>{ 
  setDeleteOpen(false);
  setWorkout(null)
};

  // Sort workouts 
  const sortedWorkouts = workouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Group workouts by month
  const groupedWorkoutsByMonth = {};
  sortedWorkouts.forEach((workout) => {
    const monthYear = dayjs(workout.date).format('MMMM YYYY');
    if (!groupedWorkoutsByMonth[monthYear]) {
      groupedWorkoutsByMonth[monthYear] = [];
    }
    groupedWorkoutsByMonth[monthYear].push(workout);
  });

  return (
    <div>
      <Grid item xs={12} md={6}>
        {Object.keys(groupedWorkoutsByMonth).map((monthYear) => (
          <div key={monthYear}>
            <Typography variant="h5" gutterBottom>{monthYear}</Typography>
            <List sx={{width:'88%'}}>
              {groupedWorkoutsByMonth[monthYear].map((workout) => (
                <>
                 <ListItem
                  key={workout.id}
                  secondaryAction={
                    <>
                      <IconButton>
                        <OpenInNewOutlinedIcon 
                            sx={{ cursor: 'pointer' }}
                            onClick= {()=> handleClickOpen(workout)}
                             />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon 
                        sx={{ cursor: 'pointer' }} 
                        onClick = {()=> handleDeleteClickOpen(workout)} />
                      </IconButton>
                    </>
                  }>
                  <ListItemAvatar>
                    <Avatar sx={{backgroundColor:PRIMARY}}>
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
                <span  >
                </span>
                
                </>
               
               
              ))}
            </List>
          </div>
        ))}
      </Grid>
      {/* MODAL */}
      <div>
        <WorkoutModall  open={open} handleClose={handleClose} workout={workout} />
        <DeleteWorkoutModal open={deleteOpen} handleClose={handleDeleteClose} workout={workout} />
    </div>
    </div>
  );
};

export default WorkoutList;
