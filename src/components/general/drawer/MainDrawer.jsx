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


const drawerBleeding = 0;

const Root = styled('div')(({ theme }) => ({
  //  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[900],
   bgcolor: 'background.paper'
}));

const StyledBox = styled('div')(({ theme }) => ({
  //  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[900],
  // bgcolor: 'background.paper'
  bgcolor: 'background.paper'
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[700],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));


function MainDrawer({drawerTitle, drawerContent, drawerOpenButton, buttonVariant}) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    return (
      <div>
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
          <Button variant={buttonVariant}  onClick={toggleDrawer(true)}>{drawerOpenButton}</Button>
        </Box>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          allowSwipeInChildren="true"
          swipeAreaWidth={drawerBleeding}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 25,
              borderTopRightRadius:25 ,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography variant='h4' sx={{ p: 3, color: 'text.primary'}}>
                {drawerTitle}
            </Typography>

          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              marginTop:'15vh',
              overflow: 'auto',
            }}
          >
          {drawerContent}
          </StyledBox>
        </SwipeableDrawer>
      </Root>
      </div>
    );
  }
  
  MainDrawer.propTypes = {
    window: PropTypes.func,
  };
  
  export default MainDrawer;