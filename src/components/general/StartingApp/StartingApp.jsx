import { FitnessCenterTwoTone } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { usePrimary } from "../Constants";
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
        marginTop: "20vh",
      }}
    >
      <div class="wrapper ten">
        <div>
          <div className="icon ten">
            <FitnessCenterTwoTone
              sx={{
                color: usePrimary,
                fontSize: "3rem",
              }}
            />
          </div>
          <h3 class="bounce">
            <span>w</span>
            <span>o</span>
            <span>r</span>
            <span>k</span>
            <span>o</span>
            <span>u</span>
            <span>t</span>
            <span>G</span>
            <span>u</span>
            <span>r</span>
            <span>u</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default StartingApp;
