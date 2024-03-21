import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const Alertt = ({ type, severity }) => {
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
      sx={{ zIndex: "1000000000", marginTop: 0 }}
      open={isVisible}
      autoHideDuration={10000}
      onClose={() => setIsVisible(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        onClose={() => setIsVisible(false)}
        variant="filled"
        sx={{ zIndex: "100000000", marginTop: 0 }}
      >
        {type}
      </Alert>
    </Snackbar>
  );
};

export default Alertt;
