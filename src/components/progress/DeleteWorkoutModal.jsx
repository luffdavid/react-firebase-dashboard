import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteDoc, doc } from "firebase/firestore";
import * as React from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { usePrimary } from "../general/Constants";
import Alert from "../general/alert/Alert";
export default function DeleteWorkoutModal({ open, handleClose, type, data }) {
  const { currentUser } = React.useContext(AuthContext);
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const PRIMARY = usePrimary();
  const handleDelete = async () => {
    try {
      type === "workout"
        ? await deleteDoc(
            doc(db, "users", currentUser.uid, "workouts", data.id)
          )
        : await deleteDoc(
            doc(db, "users", currentUser.uid, "weights", data.id)
          );
      handleClose();
      setShowDeleteAlert(true);
      setTimeout(() => {
        setShowDeleteAlert(false);
        window.location.reload();
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  };

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
            Are you sure you want to delete {type}
            {type === "workout"
              ? data && <span style={{ color: PRIMARY }}> {data.title} ?</span>
              : data && (
                  <span style={{ color: PRIMARY }}> from {data.date} ?</span>
                )}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This cannot be undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              autoFocus
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {showDeleteAlert && <Alert type={type + " deleted"} severity={"error"} />}
    </div>
  );
}
