import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import AddWorkoutForm from "../../components/add/AddWorkoutForm";
import { Button } from "@mui/material";
import AddDrawer from "../../components/add/AddDrawer"
const Add = () => {
  return (
    <div className="page">
      <PageHeaderMain pageName={"Add"} />
      <AddDrawer />
    </div>
  )
}
  export default Add;