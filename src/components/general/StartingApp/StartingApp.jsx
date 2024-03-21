import { FitnessCenterTwoTone } from "@mui/icons-material";
import { LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./StartingApp.scss";

function StartingApp() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="wrapper ten">
        <div>
          <div className="icon ten">
            <FitnessCenterTwoTone
              sx={{
                color: "#6439FF",
                fontSize: "3rem",
              }}
            />
          </div>
          <h3 class="bounce">
            <span>g</span>
            <span>y</span>
            <span>m</span>
            <span>t</span>
            <span>r</span>
            <span>a</span>
            <span>c</span>
            <span>k</span>
            <span>e</span>
            <span>r</span>
          </h3>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="primary" />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default StartingApp;
