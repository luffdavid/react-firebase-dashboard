import PageHeaderMain from "../../components/general/heading/PageHeaderMain";
import AddWorkoutForm from "../../components/add/AddWorkoutForm";

const Add = () => {
  return (
    <div className="page">
      <PageHeaderMain pageName={"Add"} />
      <AddWorkoutForm />
    </div>
  )
}
  export default Add;