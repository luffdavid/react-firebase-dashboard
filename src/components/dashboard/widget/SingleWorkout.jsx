import { FitnessCenterTwoTone } from "@mui/icons-material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import TitleIcon from "@mui/icons-material/Title";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { usePrimary } from "../../general/Constants";
import MainDrawer from "../../general/drawer/MainDrawer";
export default function SingleWorkout({ workout, showOnlyContent }) {
  const PRIMARY = usePrimary();
  const drawerContent = workout && (
    <List className="widget-reusable" sx={{ width: "100%" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
            <TitleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Title" secondary={workout.title} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
            <EventOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Date"
          secondary={workout?.date ? <>{workout.date}</> : <>Not provided</>}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
            <LocationOnOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Location"
          secondary={
            workout?.location ? <>{workout.location}</> : <>Not provided</>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
            <FitnessCenterTwoTone />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Exercises and Weight"
          secondary={
            workout?.exercisesAndWeight ? (
              <>{workout.exercisesAndWeight}</>
            ) : (
              <>Not provided</>
            )
          }
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
            <NotesOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Notes"
          secondary={workout?.notes ? <>{workout.notes}</> : <>Not provided</>}
        />
      </ListItem>
    </List>
  );

  return (
    <>
      {showOnlyContent ? (
        drawerContent
      ) : (
        <div>
          <MainDrawer
            drawerTitle={"Your last Workout"}
            drawerContent={drawerContent}
            buttonVariant={"text"}
            drawerOpenButton={<OpenInNewRoundedIcon color="primary" />}
          />
        </div>
      )}
    </>
  );
}
