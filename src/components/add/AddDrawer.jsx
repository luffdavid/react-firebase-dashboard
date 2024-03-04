import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AddWorkoutForm from './AddWorkoutForm';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
 
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[900],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));



  // This is used only for the example
//   const container = window !== undefined ? () => window().document.body : undefined;

function SwipeableEdgeDrawer(props) {
    const [open, setOpen] = React.useState(false);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    return (
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: '70%',
              overflow: open ? 'visible' : 'hidden'
            },
          }}
        />
        <Box>
          <Button variant="contained" onClick={toggleDrawer(true)}>Add a new workout</Button>
        </Box>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          allowSwipeInChildren="true"
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: 'text.primary' }}>
                Add a new workout
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
           <AddWorkoutForm />
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    );
  }
  
  SwipeableEdgeDrawer.propTypes = {
    window: PropTypes.func,
  };
  
  export default SwipeableEdgeDrawer;