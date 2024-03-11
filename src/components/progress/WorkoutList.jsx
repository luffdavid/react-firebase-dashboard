import { FitnessCenterTwoTone } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Grid, IconButton, ListItemIcon, Skeleton } from "@mui/material"; // Import für IconButton und Grid hinzugefügt
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import React from "react";
import Add from "../../assets/Add.svg";
import SingleWorkout from "../dashboard/widget/SingleWorkout";
import { usePrimary } from "../general/Constants";
import MainDrawer from "../general/drawer/MainDrawer";
import DeleteWorkoutModal from "./DeleteWorkoutModal";

const WorkoutList = ({ workouts, workoutsLoading }) => {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [workout, setWorkout] = React.useState(null);
  const PRIMARY = usePrimary();
  const handleClickOpen = (workout) => {
    setOpen(true);
    setWorkout(workout);
  };

  const handleDeleteClickOpen = (workout) => {
    setDeleteOpen(true);
    setWorkout(workout);
  };

  const handleClose = () => {
    setOpen(false);
    setWorkout(null);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setWorkout(null);
  };

  // Sort workouts

  // Group workouts by month
  const groupedWorkoutsByMonth = {};
  workouts.forEach((workout) => {
    const monthYear = dayjs(workout.date).format("MMMM YYYY");
    if (!groupedWorkoutsByMonth[monthYear]) {
      groupedWorkoutsByMonth[monthYear] = [];
    }
    groupedWorkoutsByMonth[monthYear].push(workout);
  });

  return (
    <div>
      {workoutsLoading ? (
        <List>
          <ListItem>
            <ListItemIcon>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemIcon>
            <ListItemText primary={<Skeleton variant="text" />} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemIcon>
            <ListItemText primary={<Skeleton variant="text" />} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemIcon>
            <ListItemText primary={<Skeleton variant="text" />} />
          </ListItem>
        </List>
      ) : (
        <>
          {workouts.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <img src={Add} alt="Add" height={"200vh"} /> <br />
              You didn't add a workout yet
            </div>
          ) : (
            <Grid item xs={12} md={6}>
              {Object.keys(groupedWorkoutsByMonth).map((monthYear) => (
                <div key={monthYear}>
                  <Typography variant="h5" gutterBottom>
                    {monthYear}
                  </Typography>
                  <List sx={{ width: "88%" }}>
                    {groupedWorkoutsByMonth[monthYear].map((workout) => (
                      <ListItem
                        key={workout.id}
                        secondaryAction={
                          <>
                            <IconButton>
                              <MainDrawer
                                drawerTitle={"Details for your workout"}
                                drawerContent={
                                  <SingleWorkout
                                    workout={workout}
                                    showOnlyContent={true}
                                  />
                                }
                                drawerOpenButton={<OpenInNewOutlinedIcon />}
                                buttonVariant={""}
                              />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleDeleteClickOpen(workout)}
                              />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: PRIMARY }}>
                            <FitnessCenterTwoTone />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <Typography variant="h6">
                                {workout.title}
                              </Typography>
                            </>
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                              >
                                {dayjs(workout.date).format("DD/MM/YYYY")}{" "}
                                <br />
                                from {workout.start} to {workout.end} <br />
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </Grid>
          )}
        </>
      )}
      {/* MODAL */}
      <div>
        <DeleteWorkoutModal
          open={deleteOpen}
          handleClose={handleDeleteClose}
          type={"workout"}
          data={workout}
        />
      </div>
    </div>
  );
};

export default WorkoutList;
