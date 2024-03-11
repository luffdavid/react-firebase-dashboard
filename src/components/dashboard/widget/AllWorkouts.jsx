import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { usePrimary } from "../../general/Constants";
import MainDrawer from "../../general/drawer/MainDrawer";
import ReusableWorkoutList from "../../general/workouts/ReusableWorkoutList";

export default function WorkoutsThisMonth({ workouts }) {
  const drawerContent = <ReusableWorkoutList workouts={workouts} />;
  const PRIMARY = usePrimary();
  return (
    <div>
      <div>
        <MainDrawer
          drawerTitle={"All Workouts"}
          drawerContent={drawerContent}
          buttonVariant={"text"}
          drawerOpenButton={<OpenInNewRoundedIcon color="primary" />}
        />
      </div>
    </div>
  );
}
