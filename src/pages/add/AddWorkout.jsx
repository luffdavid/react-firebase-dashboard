import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Grid, Box } from "@mui/material";
import "../../components/reusable/Reusable.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
const AddWorkout = () => {

  const {currentUser } = useContext(AuthContext);
  const [titleInput, setTitleInput] = useState(null);
  const [dateInput, setDateInput] = useState(null);
  const [startTimeInput, setStartTimeInput] = useState(null);
  const [endTimeInput, setEndTimeInput] = useState(null);
  const [exercisesAndWeightInput, setExercisesAndWeightInput] = useState(null);
  const [locationInput, setLocationInput] = useState(null);
  const [notesInput, setNotesInput] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();

    // Erzeuge ein passendes Datum für Firestore
    const startDateTimeISO = new Date(`${dateInput}T${startTimeInput}:00`).toISOString();
    const endDateTimeISO = new Date(`${dateInput}T${endTimeInput}:00`).toISOString();

    // Daten, die gespeichert werden sollen
    const workoutData = {
      title: titleInput,
      date: dateInput,
      start: startDateTimeISO,
      end: endDateTimeISO,
      exercisesAndWeight: exercisesAndWeightInput,
      location: locationInput,
      notes: notesInput,
      uid: currentUser.uid,
    };

    try {
      // Speichert das workoutData Objekt in der Firestore Collection 'workouts'
      const docRef = await addDoc(collection(db, "workouts"), workoutData);
      console.log("Document written with ID: ", docRef.id);
      // Optional: Zurücksetzen der Eingabefelder nach dem Hinzufügen
      setTitleInput("");
      setDateInput("");
      setStartTimeInput("");
      setEndTimeInput("");
      setExercisesAndWeightInput("");
      setLocationInput("");
      setNotesInput("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Workouts: ", error);
    }
  };


  return (
    <div style={{marginLeft:'3%'}}>
      <Typography variant="h4" >
        <b>Add Workout</b>
      </Typography>
      <Box className="widget-reusable" component="form" onSubmit={handleAdd} style={{width:'80%', display:'flex', justifyContent:'center'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Grid item xs={12}>
          <TextField 
          fullWidth 
          id="title"
           label="Title"
           required
           value={titleInput}
           onChange={(e) => setTitleInput(e.target.value)} />
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth
          id="date"
          label="Date"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          value={dateInput} 
          onChange={(e) => setDateInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth
          id="start-time"
          label="Start Time"
          type="time"
          required
          InputLabelProps={{ shrink: true }}
          value={startTimeInput} 
          onChange={(e) => setStartTimeInput(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth 
          id="end-time"
          label="End Time"
           type="time"
           required
            InputLabelProps={{ shrink: true }}
            value={endTimeInput} 
            onChange={(e) => setEndTimeInput(e.target.value)} /> 
        </Grid>
        <Grid item xs={12}>
          <TextField 
          fullWidth 
          id="exercises-and-weight" 
          label="Exercises and weight (Optional)" 
          multiline rows={4}
          value={exercisesAndWeightInput} 
          onChange={(e) => setExercisesAndWeightInput(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField 
          fullWidth 
          id="location"
           label="Location (Optional)" 
           value={locationInput} 
          onChange={(e) => setLocationInput(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField 
          fullWidth
           id="Notes"
            label="Notes (Optional)"
            multiline rows={4}
            value={notesInput} 
            onChange={(e) => setNotesInput(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button 
          variant="contained"
           color="primary"
           type="submit">
            Add Workout
          </Button>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default AddWorkout;
