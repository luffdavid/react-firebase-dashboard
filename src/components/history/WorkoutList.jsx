import {  FitnessCenterTwoTone } from '@mui/icons-material'
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import {PRIMARY} from "../reusable/Main"
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const WorkoutList = ({workouts}) => {
  return (
    <div>
        
        <Grid item xs={12} md={6}>
       
            <List>
            {workouts.map((workout) => (
                <ListItem 
                    key={workout.id}
                    secondaryAction={<>
                    <IconButton><OpenInNewOutlinedIcon sx={{cursor:'pointer'}}/></IconButton>
                    <IconButton><EditOutlinedIcon sx={{cursor:'pointer'}}/></IconButton>
                    <IconButton><DeleteIcon sx={{cursor:'pointer'}}/></IconButton></>
                    }>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: PRIMARY}}>
                            <FitnessCenterTwoTone />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                            <>
                            <Typography variant='h6'>{workout.title}</Typography>
                            </>
                        }
                        secondary={
                            <>
                            <Typography  
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            >
                                {workout.date} <br />
                                {workout.start} <br />
                                {workout.end} <br />
                            </Typography>
                            </>
                        } 
                        />
                </ListItem>
            ))}
           
            </List>
        </Grid>
    </div>
  )
}

export default WorkoutList