import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { usePrimary } from "../../general/Constants";
import MainDrawer from "../../general/drawer/MainDrawer";
import WeightDrawerContent from "../../general/weight/WeightDrawerContent";

export default function CurrentWeight({ weights }) {
  const PRIMARY = usePrimary();
  const drawerContent = weights ? (
    <WeightDrawerContent weight={weights[0]} />
  ) : (
    <>No weight measurements available</>
  );

  return (
    <div>
      <div>
        <MainDrawer
          drawerTitle={"Your current Weight"}
          drawerContent={drawerContent}
          buttonVariant={"text"}
          drawerOpenButton={<OpenInNewRoundedIcon color="primary" />}
        />
      </div>
    </div>
  );
}
