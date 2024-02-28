import { FitnessCenterTwoTone } from '@mui/icons-material';
import { Avatar , Backdrop, Box, Button, Fade, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField, Typography } from '@mui/material';
import React from  'react';
import { PRIMARY } from '../reusable/Main';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dayjs from 'dayjs';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';

const WorkoutEditModal = ({editOpen, handleEditClose, handleSaveChanges,workout}) => {
  return (
    <div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editOpen}
        onClose={handleEditClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={editOpen}>
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
                    Edit your workout <span style={{color:PRIMARY}}>
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
        <TextField  
        label="Date"
        defaultValue={workout?.date ? workout.date : "Not provided"} 
        />

      </ListItem>
      <ListItem>
        <ListItemAvatar>
    <Avatar sx={{backgroundColor: PRIMARY}}>
      <LocationOnOutlinedIcon />
    </Avatar>
  </ListItemAvatar>
  <TextField  
        label="Location"
        defaultValue={workout?.location ? workout.location : "Not provided"} 
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
    <Avatar sx={{backgroundColor: PRIMARY}}>
      <FitnessCenterTwoTone />
    </Avatar>
  </ListItemAvatar>
  <TextField  
        label="Exercises and Weight"
        defaultValue={workout?.exercisesAndWeight ? workout.exercisesAndWeight : "Not provided"} 
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor:PRIMARY}}>
            <NotesOutlinedIcon  />
          </Avatar>
        </ListItemAvatar >
        <TextField  
        label="Notes"
        defaultValue={workout?.notes ? workout.notes : "Not provided"} 
        />
      </ListItem>
    </List>
    <div style={{ position: 'absolute', bottom: '20px',right:'10px', width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}> 
  <Button variant='contained'
   color='error'
   onClick= {()=> handleEditClose()}>Close this view</Button>
   <Button variant='contained'
   color='primary'
   onClick= {()=> handleSaveChanges()}>Save  changes</Button>
</div>

    </Typography>

    
  
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default WorkoutEditModal