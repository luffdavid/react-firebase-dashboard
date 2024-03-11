import { EventOutlined } from "@mui/icons-material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import MonitorWeightRoundedIcon from "@mui/icons-material/MonitorWeightRounded";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { usePrimary } from "../Constants";

export default function WeightDrawerContent({ weight }) {
  const PRIMARY = usePrimary();
  return (
    <>
      {weight ? (
        <List className="widget-reusable" sx={{ width: "100%" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
                <MonitorWeightRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Current Weight" secondary={weight.weight} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
                <EventOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Date"
              secondary={`${weight.date} at ${weight.time}`}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
                <FlagRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Your goal" secondary={weight.target} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: PRIMARY, color: "white" }}>
                <DescriptionRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Notes"
              secondary={weight.notes ? weight.notes : "No notes provided"}
            />
          </ListItem>
        </List>
      ) : (
        <div></div>
      )}
    </>
  );
}
