import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const auth = getAuth();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });

    window.location.reload();
  };
  return logout;
};
