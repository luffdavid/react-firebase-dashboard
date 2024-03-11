import { Typography } from "@mui/material";
import React from "react";

// the main heading, used in every page
const PageHeaderMain = ({ pageName }) => {
  return (
    <div>
      <Typography variant="h4">
        <b>{pageName}</b>
      </Typography>
    </div>
  );
};

export default PageHeaderMain;
