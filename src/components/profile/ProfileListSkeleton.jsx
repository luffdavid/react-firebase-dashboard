import { IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Skeleton } from '@mui/material'
import React from 'react'

const ProfileListSkeleton = () => {
  return (
    <div><List
    sx={{ width: '80%', bgcolor: 'background.paper' }}
    subheader={<ListSubheader>Personal Information</ListSubheader>}
>
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
        <IconButton edge="end">
            <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
        
    </ListItem>
    <ListItem>
        <ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
        </ListItemIcon>
        <ListItemText primary={<Skeleton variant="text" />} />
        <IconButton edge="end">
            <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
    </ListItem>
    <ListItem>
        <ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
        </ListItemIcon>
        <ListItemText primary={<Skeleton variant="text" />} />
        <IconButton edge="end">
            <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
    </ListItem>
</List>

<List
    sx={{ width: '80%', bgcolor: 'background.paper' }}
    subheader={<ListSubheader>App Settings</ListSubheader>}
>

    <ListItem>
        <ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
        </ListItemIcon>
        <ListItemText>
            <Skeleton variant="text" width={120} />
        </ListItemText>
        <IconButton edge="end">
            <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
    </ListItem>
    <ListItem>
        <ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
        </ListItemIcon>
        <ListItemText>
            <Skeleton variant="text" width={120} />
        </ListItemText>
        <IconButton edge="end">
            <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
    </ListItem>
    <ListItem>
        <ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
        </ListItemIcon>
        <ListItemText>
            <Skeleton variant="text" width={120} />
        </ListItemText>
        <IconButton edge="end">
            <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
    </ListItem>
</List>
</div>
  )
}

export default ProfileListSkeleton