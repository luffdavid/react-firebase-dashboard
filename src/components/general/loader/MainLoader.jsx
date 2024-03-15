import React from "react";
import { usePrimary } from "../Constants";

const MainLoader = ({ isDarkMode }) => {
  const PRIMARY = usePrimary();
  return (
    <div>
      <span style={{ color: PRIMARY }}>gymTracker</span>
    </div>
  );
};

export default MainLoader;
