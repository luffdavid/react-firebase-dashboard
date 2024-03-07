import "./dashboard.scss";

import { useMediaQuery } from "@mui/material";
import WorkoutCalender from "../../components/dashboard/WorkoutCalender";
import { useEffect, useState } from "react";
import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import Widget from "../../components/dashboard/widget/Widget";
import Table from "../../components/dashboard/table/Table";
import Chart from "../../components/chart/Chart";
const Dashboard = ({ workouts }) => {
  const isTabletOrBigger = useMediaQuery("(min-width: 768px)");
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const filteredWorkouts = workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return (
        workoutDate.getMonth() === currentMonth &&
        workoutDate.getFullYear() === currentYear
      );
    });
    setWorkoutsThisMonth(filteredWorkouts);
  }, [workouts]);

  return (
    <div>
      <div className="page">
        <PageHeaderMain pageName={"Dashboard"} />
        <div className="home">
          <div className="homeContainer">
            <div className="charts">
              <Widget
                workouts={workouts}
                workoutsThisMonth={workoutsThisMonth}
                type="ALL_WORKOUTS"
              />
              <Widget
                workouts={workouts}
                workoutsThisMonth={workoutsThisMonth}
                type="WORKOUTS_THIS_MONTH"
              />
              <Widget
                workouts={workouts}
                workoutsThisMonth={workoutsThisMonth}
                type="CURRENT_WEIGHT"
              />
              <Widget
                workouts={workouts}
                workoutsThisMonth={workoutsThisMonth}
                type="LAST_WORKOUT"
              />
            </div>
            <div className="listContainer">
              <WorkoutCalender workouts={workouts} />
            </div>
            <div className="listContainer">
              <Chart
                aspect={3 / 1}
                title="Workouts( Last 6 Months)"
                workouts={workouts}
              />
            </div>
            <div className="listContainer">
              <span style={{ fontWeight: "bold" }}>YOUR LATEST WORKOUTS </span>
              <Table workouts={workouts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
