import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PRIMARY } from '../general/Constants';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import { FitnessCenterTwoTone } from '@mui/icons-material';
import { DarkModeContext } from '../../context/darkModeContext';

const WorkoutModall = ({ open, handleClose, workout }) => {
  const scroll = "paper";
  const { darkMode } = React.useContext(DarkModeContext);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
    {workout && (
        <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            backgroundColor: darkMode ? 'black' : 'white' 
        },
        }}
         
        >
          <DialogTitle id="scroll-dialog-title">
          <Typography variant='h4'>
                    Details for workout <span style={{color:PRIMARY}}>
                    {workout.title}
                    </span>
                  </Typography>
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
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
</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color='error'>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )}
    </>
    
  );
}
export default WorkoutModall; 
