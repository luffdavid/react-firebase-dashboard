import { Link } from "react-router-dom";
import { useWorkoutContext } from "../../../context/workouts/WorkoutContext";
import { useContext, useEffect, useState } from "react";
import { getWorkouts } from "../../../services/api/workoutService";
import { AuthContext } from "../../../context/AuthContext";
import { FitnessCenterTwoTone } from '@mui/icons-material';
import { PRIMARY } from "../Constants";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

const Widget = ({ type, workouts, workoutsThisMonth}) => {
 

  let data = {}; // Definieren Sie ein leeres Objekt als Standardwert für data

  switch (type) {
    case "ALL_WORKOUTS":
      data = {
        title: "ALL WORKOUTS",
        isCounter: true,
        count: workouts.length,
        link: <Link style={{color:PRIMARY}} to="/progress/workouts">View all workouts</Link>,
        icon: (
          <FitnessCenterTwoTone
            className="icon"
            sx={{color:PRIMARY}}
          />
        ),
      };
      break;
    case "LAST_WORKOUT":
      data = {
        title: "LAST WORKOUT",
        isCounter: false,
        content: workouts.length > 0 ? workouts[0].title : "No workout available",
        link: <Link style={{color:PRIMARY}}  to="/progress/workouts">View last workout</Link>,
        icon: (
          <FitnessCenterTwoTone
            className="icon"
            sx={{color:PRIMARY}}
          />
        ),
      };
      break;
    case "WORKOUTS_THIS_MONTH":
      data = {
        title: "WORKOUTS THIS MONTH",
        isCounter: true,
        count: workoutsThisMonth.length,
        link: <Link style={{color:PRIMARY}} to="/progress/workouts">View workouts this month</Link>,
        icon: (
          <FitnessCenterTwoTone
            className="icon"
            sx={{color:PRIMARY}}
          />
        ),
      };
      break;
    case "CURRENT_WEIGHT":
      data = {
        title: "CURRENT WEIGHT",
        isCounter: true,
        count: 80,
        link: <Link style={{color:PRIMARY}} to="/">View details</Link>,
        icon: (
          <MonitorWeightIcon
            className="icon"
            sx={{color:PRIMARY}}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isCounter && data.count}
        </span>
        {!data.isCounter && data.content}
        <span className="link">
          {data.link} 
        </span>
      </div>
      <div className="percentage positive"></div> 
      {data.icon}
    </div>
  );
};

export default Widget;
