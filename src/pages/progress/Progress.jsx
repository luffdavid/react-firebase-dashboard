import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect
import { getWorkouts } from "../../services/api/workoutService";
import { useWorkoutContext } from "../../context/workouts/WorkoutContext";
import WorkoutList from "../../components/progress/WorkoutList";
import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import { AuthContext } from "../../context/AuthContext";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import WeightMeasurementList from "../../components/progress/WeightMeasurementList";

const Progress = ({workouts, weights}) => {
  const [currentView, setCurrentView] = useState(() => localStorage.getItem("progressView")); // Use useState with a callback to retrieve initial value

  const handleChange = (event, newView) => {
    setCurrentView(newView);
    localStorage.setItem("progressView", newView);
  };

  return (
    <div className="page">
      <PageHeaderMain pageName={"Your Progress"} />
      <div style={{ marginTop: "30px" }}>
        <ToggleButtonGroup
          color="primary"
          value={currentView}
          exclusive
          onChange={handleChange}
          aria-label="Change view"
        >
          <ToggleButton value="workouts">Workouts</ToggleButton>
          <ToggleButton value="weightmeasurements">
            Weight measurements
          </ToggleButton>
        </ToggleButtonGroup>
        {currentView === "workouts" ? (
          <WorkoutList workouts={workouts} />
        ) : (
          <WeightMeasurementList weights={weights} />
        )}
      </div>
    </div>
  );
};

export default Progress;
