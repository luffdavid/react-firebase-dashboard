import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

export const logout = (e) => {
    const navigate = useNavigate(); 
    const { dispatch } = useContext(DarkModeContext);
    const auth = getAuth();

    dispatch({type:"LOGOUT"});
    signOut(auth)
        .then(() => {
          localStorage.removeItem("user");
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
        
        window.location.reload();      
      }
