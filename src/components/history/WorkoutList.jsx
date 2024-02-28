import { FitnessCenterTwoTone } from '@mui/icons-material';
import { Avatar, Backdrop, Box, Fade, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material';
import React from 'react';
import { PRIMARY } from '../reusable/Main';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs';
import WorkoutModal from '../history/WorkoutModal'

const WorkoutList = ({ workouts }) => {
  const [open, setOpen] = React.useState(false);
  const [workout, setWorkout] = React.useState(null);
  console.log(workouts)
  const handleOpen = (workout) => {
  setOpen(true);
  setWorkout(workout);
}
  const handleClose = () =>{ 
    setOpen(false);
  setWorkout(null)
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
                        <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon sx={{ cursor: 'pointer' }} />
                      </IconButton>
                    </>
                  }>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: PRIMARY }}>
                      <FitnessCenterTwoTone />
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
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{
              position:'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              height:'90%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4}}
              >
            <Typography id="transition-modal-title" variant="h6" component="h2">
           
              {workout && (
                <>
                   Details for {workout.title}
                </>
              )}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             {workout && (
              <>
              Date: {workout.date} <br />
              from {workout.start} to {workout.end} <br />
              Exercises and Weight:{workout.exercisesAndWeight} <br/>
              Location: {workout.location} <br />
              Notes: {workout.notes} <br />
              </>)}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
    </div>
  );
};

export default WorkoutList;
