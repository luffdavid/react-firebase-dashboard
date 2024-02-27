import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Grid, Box, CircularProgress } from "@mui/material";
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
import InputError from "../../components/reusable/InputError";
import AddSuccess from "../../components/reusable/AddSuccess";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import PageHeaderMain from "../../components/heading/PageHeaderMain";

const AddWorkout = () => {

  const {currentUser } = useContext(AuthContext);
  const [titleInput, setTitleInput] = useState(null);
  const [dateInput, setDateInput] = useState(dayjs())
  const [startTimeInput, setStartTimeInput] = useState(dayjs().subtract(1, 'hour'));
  const [endTimeInput, setEndTimeInput] = useState(dayjs());
  const [exercisesAndWeightInput, setExercisesAndWeightInput] = useState(null);
  const [locationInput, setLocationInput] = useState(null);
  const [notesInput, setNotesInput] = useState(null);
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log("date:" + dayjs(dateInput).format())
  console.log("starttime:" + dayjs(startTimeInput).format())
  console.log("endtime:" + dayjs(endTimeInput).format())

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!isValidateInput()) {
      return;
    } else {
      setIsLoading(true);
    // Daten, die gespeichert werden sollen
    const workoutData = {
      title: titleInput,
      date: dateInput.format('L'),
      start: dayjs(startTimeInput).format('LT'),
      end: endTimeInput.format('LT'),
      exercisesAndWeight: exercisesAndWeightInput,
      location: locationInput,
      notes: notesInput,
      uid: currentUser.uid,
    };
    try {
       // Holen Sie die Referenz auf das Benutzerdokument
       const userDocRef = doc(db, "users", currentUser.uid);

      // Speichert das workoutData Objekt in der Firestore SubCollection von user: 'workouts' 
  const workoutDocRef = await addDoc(collection(userDocRef, "workouts"), workoutData);
  console.log("Document written with ID: ", workoutDocRef.id);
      // Optional: Zurücksetzen der Eingabefelder nach dem Hinzufügen
      setTitleInput("");
      setDateInput(dayjs());
      setStartTimeInput(dayjs().subtract(1, 'hour'));
      setEndTimeInput(dayjs())
      setExercisesAndWeightInput("");
      setLocationInput("");
      setNotesInput("");
      setError(null); // Fehlerzustand zurücksetzen
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Workouts: ", error);
      setError("Fehler beim Hinzufügen des Workouts: " + error.message); // Fehlermeldung setzen
      setIsLoading(false);
    }
  }
  };

  //validating the input, e.g. date cannot be in past
  const isValidateInput = () =>  {
    // Check if date is in the past
    if (dayjs(dateInput).isAfter(dayjs()) 
        || dayjs(startTimeInput).isAfter(dayjs()) 
        || dayjs(endTimeInput).isAfter(dayjs())) {
        setError('Workout date cannot be in the past.');
        return false;
    } 
    if(dayjs(startTimeInput).isAfter(dayjs(endTimeInput))) {
      setError('Starttime of your workout cannot be after endtime. ');
      return false;
  }   

    setError(null); // Fehlerzustand zurücksetzen, wenn keine Fehler vorhanden sind
    return true; // Alle Validierungen bestanden
}

  return (
    <div className="page">
      <PageHeaderMain pageName={"Add"} />
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          label="Date"
          value={dateInput} 
          onChange={(e) => setDateInput(e.target.value)}
          slotProps={{
            textField: {
              required: true,
            },
          }}
          />
        </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start time"
            required
            value={startTimeInput} 
            onChange={(e) => setStartTimeInput(e.target.value)} 
            slotProps={{
              textField: {
                required: true,
              },
            }}
            />
        </LocalizationProvider>
        
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End time"
            required
            value={endTimeInput} 
            onChange={(e) => setEndTimeInput(e.target.value)}
            slotProps={{
              textField: {
                required: true,
              },
            }} /> 
        </LocalizationProvider>
           
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
           type="submit"
           disabled={isLoading}
           sx={{position:'relative'}}
           >
            {isLoading ? <CircularProgress size={24} />  : ''}
            Add Workout
          </Button>
        </Grid>
        {error && ( // Fehlermeldung anzeigen, wenn ein Fehler vorhanden ist
          <Grid item xs={12}>
            <Typography variant="body2" color="error">
              <InputError title={error} />
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
    {success && (
      <AddSuccess type={"Workout saved!"} />
    )}
    </div>
  );
};

export default AddWorkout;
