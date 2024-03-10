import { Typography } from "@mui/material";
import AllWorkouts from "./AllWorkouts";
import CurrentWeight from "./CurrentWeight";
import LastWorkout from "./SingleWorkout";
import WorkoutsThisMonth from "./WorkoutsThisMonth";
import AddImg from "../../../assets/NotFound.svg";
import SingleWorkout from "./SingleWorkout";
const Widget = ({ type, workouts, workoutsThisMonth, weights }) => {
  let data = {};
  switch (type) {
    case "ALL_WORKOUTS":
      data = {
        title: "ALL WORKOUTS",
        isCounter: true,
        count: workouts?.length > 0 ? workouts.length : "0",
        icon: <AllWorkouts workouts={workouts} />,
      };
      break;
    case "LAST_WORKOUT":
      data = {
        title: "LAST WORKOUT",
        isCounter: false,
        content: workouts?.length > 0 ? workouts[0].title : "No workout added",
        icon: <SingleWorkout workout={workouts[0]} showOnlyContent={false} />,
      };
      break;
    case "WORKOUTS_THIS_MONTH":
      data = {
        title: "WORKOUTS THIS MONTH",
        isCounter: true,
        count:
          workoutsThisMonth?.length > 0
            ? workoutsThisMonth.length
            : "0",
        icon: <WorkoutsThisMonth workouts={workoutsThisMonth} />,
      };
      break;
    case "CURRENT_WEIGHT":
      data = {
        title: "CURRENT WEIGHT",
        isCounter: true,
        count: weights?.length > 0 ? weights[0].weight + " kg" : (
          <>
             No weight added yet
          </>
        ),
        icon: <CurrentWeight weights={weights} />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span style={{ fontWeight: "bold" }}>{data.title}</span>
        <Typography className="counter" color="secondary">
          {data.isCounter && data.count}
          {!data.isCounter && data.content}
        </Typography>
      </div>
      {data.icon}
    </div>
  );
};

export default Widget;
