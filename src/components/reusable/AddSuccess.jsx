import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import { SUCCESS } from './Main';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const AddSuccess = ({ type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verzögern Sie das Erscheinen der Snackbar um einige Millisekunden, um die Animation besser sichtbar zu machen
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={10000} // Zeit in Millisekunden, wie lange die Snackbar sichtbar sein soll
      onClose={() => setIsVisible(false)}
      message={
        <span>
          {`${type} saved! `}
         
        </span>
      }
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      ContentProps={{
        sx: {
          background: SUCCESS
        }
      }}
    />
  );
}

export default AddSuccess;
