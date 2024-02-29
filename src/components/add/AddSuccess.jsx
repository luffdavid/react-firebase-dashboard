import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AddSuccess = ({ type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
     autoHideDuration={10000}
     onClose={() => setIsVisible(false)}
     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
     >
        <Alert
          severity="success"
          onClose={() => setIsVisible(false)}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {type}
        </Alert>
    </Snackbar>
  );
}

export default AddSuccess;
