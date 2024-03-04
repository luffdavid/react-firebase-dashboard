import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import { Button } from "@mui/material";
import Drawer from '../../components/general/drawer/Drawer'
import AddWorkoutForm from "../../components/add/AddWorkoutForm";
const Add = () => {
  return (
    <div className="page">
      <PageHeaderMain pageName={"Add"} />
     <Drawer drawerTitle={"Add a new workout"} drawerContent={<AddWorkoutForm />} />
    </div>
  )
}
  export default Add;