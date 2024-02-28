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

const WorkoutModal = ({open, handleClose, workout, isEditMode, handleEditClick}) => {
  return (
    <div>
        {isEditMode ?  
        <>
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
              borderRadius:'25px',
              position:'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              height:'60%',
              bgcolor: 'background.paper',
              border: 'none',
              boxShadow: 24,
              p: 4}}
              >
            <Typography id="transition-modal-title" variant="h6" component="h2">
           
            {workout && (
                <>
                  <Typography variant='h4'>
                    Details for your Workout <span style={{color:PRIMARY}}>
                    {workout.title}
                    </span>
                  </Typography>
                </>
              )}              

            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor:PRIMARY}}>
            <EventOutlinedIcon  />
          </Avatar>
        </ListItemAvatar >
        <ListItemText primary="Date" secondary={workout?.date ? (
    <>
      {workout.date}
    </>
  ) : (
    <>Not provided</>
  )} />     
      </ListItem>
      <ListItem>
        <ListItemAvatar>
    <Avatar sx={{backgroundColor: PRIMARY}}>
      <LocationOnOutlinedIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Location" secondary={workout?.location ? (
    <>
      {workout.location}
    </>
  ) : (
    <>Not provided</>
  )} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
    <Avatar sx={{backgroundColor: PRIMARY}}>
      <FitnessCenterTwoTone />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Exercises and Weight" secondary={workout?.exercisesAndWeight ? (
    <>
      {workout.exercisesAndWeight}
    </>
  ) : (
    <>Not provided</>
  )} />     
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor:PRIMARY}}>
            <NotesOutlinedIcon  />
          </Avatar>
        </ListItemAvatar >
        <ListItemText primary="Notes" secondary={workout?.notes ? (
    <>
      {workout.notes}
    </>
  ) : (
    <>Not provided</>
  )} />     
      </ListItem>
    </List>
    <div style={{ position: 'absolute', bottom: '20px',right:'10px', width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}> 
  <Button variant='contained'
   color='error'
   onClick= {()=> handleClose()}>Close this view</Button>
  <Button variant='contained' onClick={handleEditClick}>Edit Workout</Button>
</div>

    </Typography>

    
  
          </Box>
        </Fade>
      </Modal>
        </>
          : (
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
                  borderRadius:'25px',
                  position:'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  height:'60%',
                  bgcolor: 'background.paper',
                  border: 'none',
                  boxShadow: 24,
                  p: 4}}
                  >
                <Typography id="transition-modal-title" variant="h6" component="h2">
               
                {workout && (
                    <>
                      <Typography variant='h4'>
                        Details for your Workout <span style={{color:PRIMARY}}>
                        {workout.title}
                        </span>
                      </Typography>
                    </>
                  )}              
    
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{backgroundColor:PRIMARY}}>
                <EventOutlinedIcon  />
              </Avatar>
            </ListItemAvatar >
            <ListItemText primary="Date" secondary={workout?.date ? (
        <>
          {workout.date}
        </>
      ) : (
        <>Not provided</>
      )} />     
          </ListItem>
          <ListItem>
            <ListItemAvatar>
        <Avatar sx={{backgroundColor: PRIMARY}}>
          <LocationOnOutlinedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Location" secondary={workout?.location ? (
        <>
          {workout.location}
        </>
      ) : (
        <>Not provided</>
      )} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
        <Avatar sx={{backgroundColor: PRIMARY}}>
          <FitnessCenterTwoTone />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Exercises and Weight" secondary={workout?.exercisesAndWeight ? (
        <>
          {workout.exercisesAndWeight}
        </>
      ) : (
        <>Not provided</>
      )} />     
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{backgroundColor:PRIMARY}}>
                <NotesOutlinedIcon  />
              </Avatar>
            </ListItemAvatar >
            <ListItemText primary="Notes" secondary={workout?.notes ? (
        <>
          {workout.notes}
        </>
      ) : (
        <>Not provided</>
      )} />     
          </ListItem>
        </List>
        <div style={{ position: 'absolute', bottom: '20px',right:'10px', width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}> 
      <Button variant='contained'
       color='error'
       onClick= {()=> handleClose()}>Close this view</Button>
      <Button variant='contained' onClick={handleEditClick}>Edit Workout</Button>
    </div>
    
        </Typography>
    
        
      
              </Box>
            </Fade>
          </Modal>
          )} 
     
    </div>
  )
}

export default WorkoutModal