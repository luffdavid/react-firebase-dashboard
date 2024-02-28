import { FitnessCenterTwoTone } from '@mui/icons-material';
import { Avatar , Backdrop, Box, Button, Fade, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material';
import React from  'react';
import { PRIMARY } from '../reusable/Main';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import WorkoutModal from './WorkoutModal';
import WorkoutEditModal from './WorkoutEditModal';


const WorkoutList = ({ workouts }) => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [workout, setWorkout] = React.useState(null);
  const handleOpen = (workout) => {
  setOpen(true);
  setWorkout(workout);
}
const handleEdit = (workout) => {
  setEditOpen(true);
  setWorkout(workout);
}
  const handleClose = () =>{ 
    setOpen(false);
  setWorkout(null)
};

const handleEditClose = () =>{ 
  setEditOpen(false);
setWorkout(null)
};
const handleSaveChanges = () =>{ 
  setEditOpen(false);
  //TO IMPLEMENT
};



  // Sortiere die Workouts nach dem Datum absteigend (neuestes zuerst)
  const sortedWorkouts = workouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Gruppiere die Workouts nach Monaten
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
            <List>
              {groupedWorkoutsByMonth[monthYear].map((workout) => (
                <>
                 <ListItem
                  key={workout.id}
                  secondaryAction={
                    <>
                      <IconButton>
                        <OpenInNewOutlinedIcon 
                            sx={{ cursor: 'pointer' }}
                            onClick= {()=> handleOpen(workout)}
                             />
                      </IconButton>
                      <IconButton>
                        <EditOutlinedIcon 
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(workout)} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon sx={{ cursor: 'pointer' }} />
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
        <WorkoutModal  open={open} handleClose={handleClose} workout={workout} />
        <WorkoutEditModal editOpen={editOpen} handleEditClose={handleEditClose} handleSaveChanges={handleSaveChanges} workout={workout} />
    </div>
    </div>
  );
};

export default WorkoutList;
