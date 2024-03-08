import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { PRIMARY } from "../general/Constants";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { IconButton } from "@mui/material";
import MainDrawer from "../general/drawer/MainDrawer";

export default function WorkoutCalender({ workouts }) {
  const bookedStyle = { border: "1px solid" + PRIMARY, margin: "2px" };
  const [currentWorkout, setCurrentWorkout] = useState(null);

  const handleDayClick = (day, modifiers) => {
    if (modifiers.booked) {
      const selectedWorkout = workouts.find(
        (w) => new Date(w.date).toDateString() === day.toDateString()
      );
      setCurrentWorkout(selectedWorkout ? selectedWorkout : null);
    } else {
      setCurrentWorkout(null);
    }
  };

  const workoutDates = workouts.map((w) => new Date(w.date));
  return (
    <div className="chart">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "bold" }}>WORKOUT CALENDER</span>
        <MainDrawer
          drawerTitle={"Workout Calender"}
          drawerOpenButton={<OpenInNewRoundedIcon color={"primary"} />}
          buttonVariant={"text"}
          drawerContent={
            <div>
              <DayPicker
                mode="single"
                numberOfMonths={3}
                showOutsideDays
                defaultMonth={Date.now()}
                modifiers={{ booked: workoutDates }}
                modifiersStyles={{ booked: bookedStyle }}
                onDayClick={handleDayClick}
                
              />
              {currentWorkout && <>{currentWorkout.title}</>}
            </div>
          }
        />
      </div>
      <DayPicker
        mode="single"
        showOutsideDays
        defaultMonth={Date.now()}
        modifiers={{ booked: workoutDates }}
        modifiersStyles={{ booked: bookedStyle }}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
