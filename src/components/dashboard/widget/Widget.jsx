import { Skeleton, Typography } from "@mui/material";
import AllWorkouts from "./AllWorkouts";
import CurrentWeight from "./CurrentWeight";
import SingleWorkout from "./SingleWorkout";
import WorkoutsThisMonth from "./WorkoutsThisMonth";
const Widget = ({
  type,
  workouts,
  workoutsThisMonth,
  weights,
  workoutsLoading,
}) => {
  let data = {};
  switch (type) {
    case "ALL_WORKOUTS":
      data = {
        title: "ALL WORKOUTS",
        isCounter: true,
        count:
          workouts !== undefined ? (
            workouts.length > 0 ? (
              workouts.length
            ) : (
              "0"
            )
          ) : (
            <Skeleton />
          ),
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
        count: workoutsThisMonth?.length > 0 ? workoutsThisMonth.length : "0",
        icon: <WorkoutsThisMonth workouts={workoutsThisMonth} />,
      };
      break;
    case "CURRENT_WEIGHT":
      data = {
        title: "CURRENT WEIGHT",
        isCounter: true,
        count: weights?.length > 0 ? weights[0].weight + " kg" : <>-</>,
        icon: <CurrentWeight weights={weights} />,
      };
      break;
    default:
      break;
  }

  return (
    <div>
      {workoutsLoading ? (
        <div>
          <div className="widget">
            <div className="left">
              <span style={{ fontWeight: "bold" }}>{data.title}</span>
              <Typography className="counter" color="secondary">
                <Skeleton />
              </Typography>
            </div>
            {data.icon}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Widget;
