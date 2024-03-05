import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { PRIMARY } from '../general/Constants';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import Alert from '../general/alert/Alert';
export default function DeleteWorkoutModal({ open, handleClose, workout }) {
    const {currentUser } = React.useContext(AuthContext);
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const handleDelete = async () => {
    try {
        await deleteDoc(doc(db, "users", currentUser.uid, "workouts", workout.id));
    handleClose();
    setShowDeleteAlert(true);
    setTimeout(() => {
        setShowDeleteAlert(false);
        window.location.reload();
      }, 3000)
    } catch(e) {
        console.error(e);
    }
  }

  return (
    <div>
        <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete workout {workout && (
            <span style={{ color: PRIMARY }}>
              {workout.title} ?
            </span>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    {showDeleteAlert && (
       <Alert type={"Workout deleted"} severity={"error"} />
    )}
    </div>
    
  );
}
