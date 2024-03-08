import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { PRIMARY } from '../general/Constants';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import dayjs from 'dayjs';
import DeleteWorkoutModal from './DeleteWorkoutModal';
import Add from "../../assets/NotFound.svg";

const WeightMeasurementList = ({ weights }) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [weight, setWeight] = React.useState(null);

  const handleDeleteClickOpen = (weight) => {
    setDeleteOpen(true);
    setWeight(weight);
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setWeight(null);
  };

  return (
    <div>
      {weights !== null && Array.isArray(weights) && weights.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <img src={Add} alt="Add" height={"200vh"} /> <br />
          You didn't add a weight yet
        </div>
      ) : (
        <Grid item xs={12} md={6}>
          <List sx={{ width: '88%' }}>
            {weights?.map((weight) => (
              <ListItem key={weight.id}
                secondaryAction={
                  <>
                    <IconButton>
                      <OpenInNewOutlinedIcon
                        sx={{ cursor: 'pointer' }}

                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteClickOpen(weight)}
                      />
                    </IconButton>
                  </>
                }>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: PRIMARY }}>
                    <MonitorWeightOutlinedIcon />
                  </Avatar>
                </ListItemAvatar >
                <ListItemText
                  primary={
                    <>
                      <Typography variant='h6'>{weight.weight}</Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                      >
                        {dayjs(weight.date).format('DD/MM/YYYY')} <br />
                        at {weight.time} <br />
                        Your goal: {weight.target} <br />
                        {weight.notes ? "Notes: " + weight.notes : ""}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
      {/* MODAL */}
      <div>
        <DeleteWorkoutModal open={deleteOpen} handleClose={handleDeleteClose} type={"weight"} data={weight} />
      </div>
    </div>
  );
};

export default WeightMeasurementList;
