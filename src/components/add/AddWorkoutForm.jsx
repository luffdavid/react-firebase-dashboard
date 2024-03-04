import { TextField, Button, Typography, Grid, Box, CircularProgress } from "@mui/material";
import "../../components/general/Reusable.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc
} from "firebase/firestore";
import {  db } from "../../firebase";
import InputError from "../../components/general/InputError";
import AddSuccess from "../../components/add/AddSuccess";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import PageHeaderMain from "../../components/general/heading/PageHeaderMain";


const AddWorkoutForm = () => {
  const {currentUser } = useContext(AuthContext);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState(dayjs());
  const [startTimeInput, setStartTimeInput] = useState(dayjs().subtract(1, 'hour'));
  const [endTimeInput, setEndTimeInput] = useState(dayjs());
  const [exercisesAndWeightInput, setExercisesAndWeightInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleAdd = async (e) => {
    e.preventDefault();
    if(!isValidateInput()) {
      return;
    } else {
      setIsLoading(true);
      const workoutData = {
        title: titleInput,
        date: dateInput.format('YYYY-MM-DD'),
        start: startTimeInput.format('HH:mm'),
        end: endTimeInput.format('HH:mm'),
        exercisesAndWeight: exercisesAndWeightInput,
        location: locationInput,
        notes: notesInput,
        uid: currentUser.uid,
      };
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const workoutDocRef = await addDoc(collection(userDocRef, "workouts"), workoutData);
        // Set the inputs to INITIAL and show successMsg
          setTitleInput("");
          setDateInput(dayjs());
          setStartTimeInput(dayjs().subtract(1, 'hour'));
          setEndTimeInput(dayjs());
          setExercisesAndWeightInput("");
          setLocationInput("");
          setNotesInput("");
          setError(null);
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false)
            window.location.reload();
          }, 2000)
        
        } catch (error) {
          setError("Error adding workout: " + error.message);
          setIsLoading(false);
        }
      }
   };

   //validates input of the date, startTime and endTime
  const isValidateInput = () =>  {
    if (dayjs(dateInput).isAfter(dayjs(), 'day') || dayjs(startTimeInput).isAfter(dayjs()) || dayjs(endTimeInput).isAfter(dayjs())) {
      setError('Workout date or time cannot be in the past.');
      return false;
    } 
    if(dayjs(startTimeInput).isAfter(dayjs(endTimeInput))) {
      setError('Start time cannot be after end time.');
      return false;
    }   
    setError(null);
    return true;
  }

  return (
    <div>
      <Box 
        className="widget-reusable"
        component="form"
        onSubmit={handleAdd}
        style={{marginTop:'2%',width:'100%', display:'flex', justifyContent:'center'}}
      >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                id="title"
                label="Title"
                required
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={dateInput} 
                  onChange={(newValue) => setDateInput(newValue)}
                  renderInput={(params) => <TextField {...params} required />} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start time"
                  required
                  value={startTimeInput} 
                  onChange={(newValue) => setStartTimeInput(newValue)} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="End time"
                  required
                  value={endTimeInput} 
                  onChange={(newValue) => setEndTimeInput(newValue)} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                id="exercises-and-weight" 
                label="Exercises and weight (Optional)" 
                multiline 
                rows={4}
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
                id="notes"
                label="Notes (Optional)"
                multiline 
                rows={4}
                value={notesInput} 
                onChange={(e) => setNotesInput(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
                sx={{position:'relative'}}>
                {isLoading ? <CircularProgress size={24} />  : ''}
                Add Workout
              </Button>
            </Grid>
            {error && (
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

export default AddWorkoutForm;
