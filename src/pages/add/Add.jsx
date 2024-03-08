import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import AddWorkoutForm from "../../components/add/AddWorkoutForm";
import MainDrawer from "../../components/general/drawer/MainDrawer";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddWeightForm from "../../components/add/AddWeightForm";

const Add = () => {
  return (
    <div className="page">
      <PageHeaderMain pageName={"Add"} />
      <MainDrawer
        drawerTitle={"Add a new workout"}
        drawerContent={<AddWorkoutForm />}
        buttonVariant={"contained"}
        drawerOpenButton={"Add a new workout"}
        startAdorment={<LibraryAddIcon />}
      />{" "}
      <br />
      <MainDrawer
        drawerTitle={"Add a new weight measurement"}
        drawerContent={<AddWeightForm />}
        buttonVariant={"contained"}
        drawerOpenButton={"Add a new weight measurement"}
        startAdorment={<LibraryAddIcon />}
      />
    </div>
  );
};
export default Add;
