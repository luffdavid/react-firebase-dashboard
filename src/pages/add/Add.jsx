import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import { Button } from "@mui/material";
import AddWorkoutForm from "../../components/add/AddWorkoutForm";
import { useState } from "react";
import MainDrawer from "../../components/general/drawer/MainDrawer";
const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="page">
      <PageHeaderMain pageName={"Add"} />
         <MainDrawer drawerTitle={"Add a new workout"} drawerContent={<AddWorkoutForm />} drawerOpenButton={"Add a new workout"} />
    
    </div>
  )
}
  export default Add;