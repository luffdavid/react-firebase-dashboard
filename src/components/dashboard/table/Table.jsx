import { FitnessCenterTwoTone } from "@mui/icons-material";
import { ListItemIcon, Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import React from "react";
import Add from "../../../assets/Add.svg";
import { usePrimary } from "../../general/Constants";

const WorkoutList = ({ workouts, workoutsLoading }) => {
  const PRIMARY = usePrimary();
  const last5workouts =
    workouts.length >= 5
      ? workouts.slice(0, 5)
      : workouts.slice(0, workouts.length);
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
      ) : workouts.length === 0 ? ( // Changed "==" to "==="
        <div style={{ textAlign: "center" }}>
          <img src={Add} alt="Add" height={"200vh"} /> <br />
          You didn't add a workout yet
        </div>
      ) : (
        <List sx={{ width: "88%", marginBottom: "20vh" }}>
          {last5workouts.map((workout) => (
            <ListItem key={workout.id}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: PRIMARY }}>
                  <FitnessCenterTwoTone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography variant="h6">{workout.title}</Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                    >
                      {dayjs(workout.date).format("DD/MM/YYYY")} <br />
                      from {workout.start} to {workout.end} <br />
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default WorkoutList;
