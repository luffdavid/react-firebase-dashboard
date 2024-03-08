import "./dashboard.scss";

import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import WorkoutCalender from "../../components/dashboard/WorkoutCalender";
import Table from "../../components/dashboard/table/Table";
import Widget from "../../components/dashboard/widget/Widget";
import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import { getWorkoutsThisMonth } from "../../services/api/workoutService";
const Dashboard = ({ workouts, weights }) => {
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState([]);
  useEffect(() => {
    const workoutsThisMonth = getWorkoutsThisMonth(workouts);
    setWorkoutsThisMonth(workoutsThisMonth);
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
                weights={weights}
                type="CURRENT_WEIGHT"
              />
              <Widget
                workouts={workouts}
                workoutsThisMonth={workoutsThisMonth}
                type="LAST_WORKOUT"
              />
            </div>
            <div className="workoutAndChart">
              <WorkoutCalender workouts={workouts} />
              <Chart
                aspect={3 / 1}
                title="Workouts( Last 6 Months)"
                workouts={workouts}
              />
            </div>
            </div>
            <div className="listContainer">
              <span style={{ fontWeight: "bold" }}>YOUR LATEST WORKOUTS </span>
              <Table workouts={workouts} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
