import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography, Grid } from "@mui/material";

const AddWorkout = () => {
  return (
    <div style={{marginLeft:'3%'}}>
      <Typography variant="h4" gutterBottom>
        <b>Add Workout</b>
      </Typography>
      <div style={{width:'80%', display:'flex', justifyContent:'center'}}>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Grid item xs={12}>
          <TextField fullWidth id="title" label="Title" />
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth id="date" label="Date" type="date" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth id="start-time" label="Start Time" type="time" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth id="end-time" label="End Time" type="time" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth id="exercises-and-weight" label="Exercises and weight" multiline rows={4} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth id="location" label="Location (Optional)" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth id="Notes" label="Notes (Optional)" multiline rows={4} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Add Workout
          </Button>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default AddWorkout;
