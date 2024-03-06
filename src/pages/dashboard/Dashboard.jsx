import "./dashboard.scss";
import { Typography } from "@mui/material";
import Widget from "../../components/general/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { useMediaQuery } from "@mui/material";
import WorkoutCalender from "../../components/dashboard/WorkoutCalender";
import { getWorkouts } from "../../services/api/workoutService";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useWorkoutContext } from "../../context/workouts/WorkoutContext";
import PageHeaderMain from "../../components/general/heading/PageHeaderMain";

const Home = ({ profileData }) => {
  const isTabletOrBigger = useMediaQuery('(min-width: 768px)');
  const { currentUser } = useContext(AuthContext);
  const { workouts, setWorkouts } = useWorkoutContext();
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutsData = await getWorkouts(currentUser.uid);
        const sortedWorkouts = workoutsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(sortedWorkouts);
        
        // Filtern Sie die Workouts für den aktuellen Monat
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const workoutsThisMonth = sortedWorkouts.filter(workout => {
          const workoutDate = new Date(workout.date);
          return workoutDate.getMonth() === currentMonth && workoutDate.getFullYear() === currentYear;
        });
        setWorkoutsThisMonth(workoutsThisMonth);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchData(); 
  }, [currentUser.uid, setWorkouts]); 

  return (
    <div> 
      {/* {isTabletOrBigger && ( */}
        <div className="page">
        <PageHeaderMain pageName={"Dashboard"} />
          <div className="home">
            <div className="homeContainer">
              <div className="charts">
                <Widget workouts={workouts} workoutsThisMonth={workoutsThisMonth} type="ALL_WORKOUTS" />
                <Widget workouts={workouts} workoutsThisMonth={workoutsThisMonth} type="WORKOUTS_THIS_MONTH" />
                <Widget workouts={workouts} workoutsThisMonth={workoutsThisMonth} type="CURRENT_WEIGHT" />
                <Widget workouts={workouts} workoutsThisMonth={workoutsThisMonth} type="LAST_WORKOUT" />
              </div>
              <div className="charts">
                {/* <Featured /> */}
                <WorkoutCalender workouts={workouts}/>
                {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
              </div>
              <div className="listContainer">
                <span style={{fontWeight:'bold'}}>YOUR LATEST WORKOUTS</span>
                <Table workouts={workouts}/>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default Home;
