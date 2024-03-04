// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { PRIMARY } from '../general/Constants';
// import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
// import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
// import { FitnessCenterTwoTone } from '@mui/icons-material';
// import { DarkModeContext } from '../../context/darkModeContext';

// const WorkoutEditModal = ({editOpen, handleEditClose, handleSaveChanges,workout}) => {
//   const scroll = "paper";
//   const { darkMode } = React.useContext(DarkModeContext);

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (editOpen) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [editOpen]);

//   return (
//     <>
//     {workout && (
//         <React.Fragment>
//         <Dialog
//           open={editOpen}
//           onClose={handleEditClose}
//           scroll={scroll}
//           aria-labelledby="scroll-dialog-title"
//           aria-describedby="scroll-dialog-description"
//           sx={{
//           "& .MuiDialog-paper": {
//             borderRadius: "1y0px",
//             backgroundColor: darkMode ? 'black' : 'white' 
//         },
//         }}
         
//         >
//           <DialogTitle id="scroll-dialog-title">
//           <Typography variant='h4'>
//                     Edit workout <span style={{color:PRIMARY}}>
//                     {workout.title}
//                     </span>
//                   </Typography>
//           </DialogTitle>
//           <DialogContent dividers={scroll === 'paper'}>
//             <DialogContentText
//               id="scroll-dialog-description"
//               ref={descriptionElementRef}
//               tabIndex={-1}
//             >
//                 <Typography id="transition-modal-description" sx={{ mt: 2 }}>
//             <List sx={{ width: '100%', maxWidth: 360 }}>
//       <ListItem>
//         <ListItemAvatar>
//           <Avatar sx={{backgroundColor:PRIMARY}}>
//             <EventOutlinedIcon  />
//           </Avatar>
//         </ListItemAvatar >
//         {workout?.date ? (
//           <>
//           <TextField
//         defaultValue={workout.date}
//         label="Date"
//         />
//           </>
//         ) : (
//           <>Not provided</>
//         )} 
     
//       </ListItem>
//       <ListItem>
//         <ListItemAvatar>
//     <Avatar sx={{backgroundColor: PRIMARY}}>
//       <LocationOnOutlinedIcon />
//     </Avatar>
//   </ListItemAvatar>
//   {workout?.location ? (
//     <>
//     <TextField
//       label="Location"
//     defaultValue={workout?.location? (
//       <>
//       {workout.location}</>
//       : (
//         "Not provided"
//       )
//     )}
  
//     />
//     </>
//       </ListItem>
//       <ListItem>
//         <ListItemAvatar>
//     <Avatar sx={{backgroundColor: PRIMARY}}>
//       <FitnessCenterTwoTone />
//     </Avatar>
//   </ListItemAvatar>
//   <ListItemText primary="Exercises and Weight" secondary={workout?.exercisesAndWeight ? (
//     <>
//       {workout.exercisesAndWeight}
//     </>
//   ) : (
//     <>Not provided</>
//   )} />     
//       </ListItem>
//       <ListItem>
//         <ListItemAvatar>
//           <Avatar sx={{backgroundColor:PRIMARY}}>
//             <NotesOutlinedIcon  />
//           </Avatar>
//         </ListItemAvatar >
//         <ListItemText primary="Notes" secondary={workout?.notes ? (
//     <>
//       {workout.notes}
//     </>
//   ) : (
//     <>Not provided</>
//   )} />     
//       </ListItem>
//     </List>
// </Typography>
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleEditClose} variant='contained' color='error'>Close</Button>
//           </DialogActions>
//         </Dialog>
//       </React.Fragment>
//     )}
//     </>
    
//   );
// }
// export default WorkoutEditModal; 
