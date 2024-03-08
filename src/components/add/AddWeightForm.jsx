import {
    TextField,
    Button,
    Typography,
    Grid,
    Box,
    CircularProgress,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
  } from "@mui/material";
  import "../../components/general/Reusable.scss";
  import { useContext, useState } from "react";
  import { AuthContext } from "../../context/AuthContext";
  import { addDoc, collection, doc } from "firebase/firestore";
  import { db } from "../../firebase";
  import InputError from "../../components/general/InputError";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { TimePicker } from "@mui/x-date-pickers/TimePicker";
  import dayjs from "dayjs";
  import { DatePicker } from "@mui/x-date-pickers";
  import { useNavigate } from "react-router-dom";
  import Alert from "../general/alert/Alert";
  
  const AddWeightForm = () => {
    const { currentUser } = useContext(AuthContext);
    const [weightInput, setWeightInput] = useState("");
    const [dateInput, setDateInput] = useState(dayjs());
    const [timeInput, setTimeInput] = useState(
      dayjs().subtract(1, "hour")
    );
    const [notesInput, setNotesInput] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState('less');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleAdd = async (e) => {
      e.preventDefault();
      if (!isValidateInput()) {
        return;
      } else {
        setIsLoading(true);
        const weightData = {
          weight: weightInput,
          date: dateInput.format("YYYY-MM-DD"),
          time: timeInput.format("HH:mm"),
          target: value,
          notes: notesInput,
          uid: currentUser.uid,
        };
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const weightDocRef = await addDoc(
            collection(userDocRef, "weights"),
            weightData
          );
          // Set the inputs to INITIAL and show successMsg
          setWeightInput("");
          setDateInput(dayjs());
          setTimeInput(dayjs().subtract(1, "hour"));
          setNotesInput("");
          setError(null);
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            // navigate("/progress/workouts");
          }, 3000);
        } catch (error) {
          setError("Error adding weight: " + error.message);
          setIsLoading(false);
        }
      }
    };
  
    //validates input of the date, startTime and endTime
    const isValidateInput = () => {
      if (
        dayjs(dateInput).isAfter(dayjs(), "day") ||
        dayjs(timeInput).isAfter(dayjs()) 
      ) {
        setError("Workout date or time cannot be in the past.");
        return false;
      }
      setError(null);
      return true;
    };
  
    return (
      <div>
        <Box
          className="widget-reusable"
          component="form"
          onSubmit={handleAdd}
          style={{
            marginTop: "2%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="weight"
                label="Weight"
                type="number"
                InputProps={{ inputMode: "numeric" }}
                required
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={dateInput}
                  required
                  onChange={(newValue) => setDateInput(newValue)}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time"
                  required
                  value={timeInput}
                  onChange={(newValue) => setTimeInput(newValue)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
            <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">What's your aim for the next measurement?</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="More" control={<Radio />} label="More"/>
    <FormControlLabel value="That's my dream weight" control={<Radio />} label="That's my dream weight" />
    <FormControlLabel value="Less" control={<Radio />} label="Less"/>
  </RadioGroup>
</FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="notes"
                label="Notes (Optional)"
                multiline
                rows={4}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
                sx={{ position: "relative" }}
              >
                {isLoading ? <CircularProgress size={24} /> : ""}
                Add weight measurement
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
        {success && <Alert type={"Weight measurement saved"} severity={"success"} />}
      </div>
    );
  };
  
  export default AddWeightForm;
  